export interface UploadToS3Options {
  folder?: string;
}

interface S3UploadResponse {
  url: string;
  key: string;
  originalName: string;
  mimeType: string;
  size: number;
}

export const imageUpload = async (
  file: File,
  options: UploadToS3Options = {},
): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  if (options.folder) {
    formData.append('folder', options.folder);
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const uploadUrl = `${apiUrl}/api/s3/upload`;

  const response = await fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al subir imagen (${response.status}): ${errorText}`);
  }

  const result: S3UploadResponse = await response.json();

  if (!result.url) {
    throw new Error('Respuesta inválida del servidor: URL no encontrada');
  }

  return result.url;
};
