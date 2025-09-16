import { IsString, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class UploadResponse {
  @Field()
  @ApiProperty({ description: 'The URL of the uploaded file' })
  url: string;

  @Field()
  @ApiProperty({ description: 'The key/path of the file in S3' })
  key: string;

  @Field()
  @ApiProperty({ description: 'Original filename' })
  originalName: string;

  @Field()
  @ApiProperty({ description: 'File MIME type' })
  mimeType: string;

  @Field()
  @ApiProperty({ description: 'File size in bytes' })
  size: number;
}

@InputType()
export class UploadOptionsInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Custom folder path (optional)',
    required: false,
  })
  folder?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsIn(['public-read', 'private'], {
    message: 'Visibility must be either public-read or private',
  })
  @ApiProperty({
    description: 'File visibility',
    enum: ['public-read', 'private'],
    required: false,
    default: 'public-read',
  })
  visibility?: 'public-read' | 'private';
}

export class UploadFileDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file to upload (JPEG, PNG, WebP, GIF)',
  })
  file: Express.Multer.File;

  @ApiProperty({
    description: 'Custom folder path (optional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  folder?: string;

  @ApiProperty({
    description: 'File visibility',
    enum: ['public-read', 'private'],
    required: false,
    default: 'public-read',
  })
  @IsOptional()
  @IsIn(['public-read', 'private'])
  visibility?: 'public-read' | 'private';
}
