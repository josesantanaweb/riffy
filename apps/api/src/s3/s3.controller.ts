import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';
import { UploadResponse } from './dto/upload.dto';
import { convertToSafeFile } from './utils/file.utils';

@Controller('s3')
export class S3Controller {
  private readonly logger = new Logger(S3Controller.name);

  constructor(private readonly s3Service: S3Service) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { folder?: string; visibility?: 'public-read' | 'private' },
  ): Promise<UploadResponse> {
    try {
      if (!file) {
        throw new BadRequestException('No file uploaded');
      }

      const safeFile = convertToSafeFile(file);

      const options = {
        folder: body.folder,
        visibility: body.visibility,
      };

      return await this.s3Service.uploadImage(safeFile, options);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `REST image upload failed: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }
}
