import { SafeFile } from '../types/file.types';

export function convertToSafeFile(file: Express.Multer.File): SafeFile {
  if (!file || !file.buffer || !file.originalname || !file.mimetype) {
    throw new Error('Invalid file object');
  }

  const originalname = file.originalname;
  const buffer = file.buffer;
  const mimetype = file.mimetype;
  const size = file.size || 0;
  const fieldname = file.fieldname || 'file';
  const encoding = file.encoding || '7bit';
  const destination = file.destination || '';
  const filename = file.filename || originalname;
  const path = file.path || '';

  return {
    buffer,
    originalname,
    mimetype,
    size,
    fieldname,
    encoding,
    destination,
    filename,
    path,
  };
}
