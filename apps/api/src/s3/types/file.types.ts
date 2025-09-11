export interface SafeFile {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
  size: number;
  fieldname: string;
  encoding: string;
  destination: string;
  filename: string;
  path: string;
}

export interface FileUpload {
  createReadStream(): AsyncIterable<Buffer>;
  filename: string;
  mimetype: string;
}
