import { BadRequestException } from '@nestjs/common';
import { FileUpload, SafeFile } from '../types/file.types';

export async function processFileUpload(file: FileUpload): Promise<SafeFile> {
  const { filename, mimetype } = file;

  if (!filename || !mimetype) {
    throw new BadRequestException('File must have a name and MIME type');
  }

  const chunks: Buffer[] = [];
  const stream = file.createReadStream();

  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  const buffer = Buffer.concat(chunks);

  if (buffer.length === 0) {
    throw new BadRequestException('File is empty');
  }

  return {
    buffer,
    originalname: filename,
    mimetype,
    size: buffer.length,
    fieldname: 'file',
    encoding: '7bit',
    destination: '',
    filename: filename,
    path: '',
  };
}
