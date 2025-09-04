import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { GraphQLUpload } from 'graphql-upload-ts';
import { S3Service } from './s3.service';
import { UploadResponse, UploadOptionsInput } from './dto/upload.dto';
import { FileUpload } from './types/file.types';
import { processFileUpload } from './utils/resolver.utils';

@Resolver()
export class S3Resolver {
  private readonly logger = new Logger(S3Resolver.name);

  constructor(private readonly s3Service: S3Service) {}

  @Mutation(() => UploadResponse)
  async uploadImage(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
    @Args({ name: 'options', type: () => UploadOptionsInput, nullable: true })
    options?: UploadOptionsInput,
  ): Promise<UploadResponse> {
    try {
      const safeFile = await processFileUpload(file);
      return await this.s3Service.uploadImage(safeFile, options);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `GraphQL image upload failed: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  @Mutation(() => String)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
  ): Promise<string> {
    const result = await this.uploadImage(file);
    return result.url;
  }
}
