import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import { UploadResponse, UploadOptionsInput } from './dto/upload.dto';
import { SafeFile } from './types/file.types';

@Injectable()
export class S3Service {
  private readonly logger = new Logger(S3Service.name);
  private s3: S3Client;
  private bucket: string;
  private region: string;

  private readonly allowedImageTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
  ];

  private readonly maxFileSize = 10 * 1024 * 1024;

  constructor() {
    this.region = process.env.AWS_REGION;
    this.bucket = process.env.AWS_S3_BUCKET || process.env.AWS_S3_BUCKET_NAME;

    if (!this.region || !this.bucket) {
      throw new Error(
        'AWS_REGION and AWS_S3_BUCKET (or AWS_S3_BUCKET_NAME) environment variables are required',
      );
    }

    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      throw new Error(
        'AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables are required',
      );
    }

    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadImage(
    file: SafeFile,
    options?: UploadOptionsInput,
  ): Promise<UploadResponse> {
    try {
      this.validateImageFile(file);

      const fileExtension = this.getFileExtension(file.originalname);
      const fileName = `${this.generateUuid()}${fileExtension}`;
      const folder = options?.folder || 'uploads';
      const fileKey = `${folder}/${fileName}`;

      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
        Metadata: {
          originalName: this.sanitizeHeaderValue(file.originalname),
          uploadedAt: new Date().toISOString(),
        },
      });

      await this.s3.send(command);

      const url = `https://${this.bucket}.s3.${this.region}.amazonaws.com/${fileKey}`;

      this.logger.log(`File uploaded successfully: ${fileKey}`);

      return {
        url,
        key: fileKey,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Failed to upload file: ${errorMessage}`, errorStack);

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to upload file to S3');
    }
  }

  private generateUuid(): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return String(uuid());
  }

  private sanitizeHeaderValue(value: string): string {
    return value
      .replace(/[^\w\-_.]/g, '_')
      .replace(/_{2,}/g, '_')
      .slice(0, 255);
  }

  private validateImageFile(file: SafeFile): void {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    if (!file.mimetype || !this.allowedImageTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type. Allowed types: ${this.allowedImageTypes.join(', ')}`,
      );
    }

    if (!file.size || file.size > this.maxFileSize) {
      throw new BadRequestException(
        `File too large. Maximum size: ${this.maxFileSize / (1024 * 1024)}MB`,
      );
    }

    if (!file.buffer || file.buffer.length === 0) {
      throw new BadRequestException('File is empty');
    }

    if (!file.originalname) {
      throw new BadRequestException('File must have a name');
    }
  }

  private getFileExtension(filename: string): string {
    const lastDotIndex = filename.lastIndexOf('.');
    return lastDotIndex !== -1 ? filename.substring(lastDotIndex) : '';
  }

  async uploadFile(file: SafeFile): Promise<string> {
    const result = await this.uploadImage(file);
    return result.url;
  }
}
