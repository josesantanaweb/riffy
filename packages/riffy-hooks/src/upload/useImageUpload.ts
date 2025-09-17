import { useState, useCallback } from 'react';

const NEXT_PUBLIC_API_URL = 'http://localhost:4000'

export interface UploadOptions {
  folder?: string;
  maxSizeMB?: number;
  allowedTypes?: string[];
  onSuccess?: (url: string) => void;
  onError?: (error: string) => void;
}

export interface UploadState {
  isUploading: boolean;
  uploadedUrl: string | null;
  previewUrl: string | null;
  error: string | null;
}

export interface UploadActions {
  uploadFile: (file: File) => Promise<void>;
  clearUpload: () => void;
  setPreview: (url: string | null) => void;
}

const DEFAULT_OPTIONS: Required<Omit<UploadOptions, 'onSuccess' | 'onError'>> = {
  folder: 'uploads',
  maxSizeMB: 10,
  allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
};

export const useImageUpload = (options: UploadOptions = {}): UploadState & UploadActions => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const config = { ...DEFAULT_OPTIONS, ...options };

  const validateFile = useCallback((file: File): string | null => {
    if (!config.allowedTypes.includes(file.type)) {
      return 'Por favor selecciona un archivo de imagen válido';
    }

    if (file.size > config.maxSizeMB * 1024 * 1024) {
      return `La imagen debe ser menor a ${config.maxSizeMB}MB`;
    }

    return null;
  }, [config.allowedTypes, config.maxSizeMB]);

  const uploadFile = useCallback(async (file: File): Promise<void> => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      options.onError?.(validationError);
      return;
    }

    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', config.folder);

      const apiUrl = NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/s3/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al subir imagen');
      }

      const result = await response.json();
      setUploadedUrl(result.url);
      URL.revokeObjectURL(preview);
      setPreviewUrl(null);

      options.onSuccess?.(result.url);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      setPreviewUrl(null);
      options.onError?.(errorMessage);
      console.error('Error uploading image:', err);
    } finally {
      setIsUploading(false);
    }
  }, [validateFile, config.folder, options]);

  const clearUpload = useCallback(() => {
    setUploadedUrl(null);
    setPreviewUrl(null);
    setError(null);
  }, []);

  const setPreview = useCallback((url: string | null) => {
    setPreviewUrl(url);
  }, []);

  return {
    isUploading,
    uploadedUrl,
    previewUrl,
    error,
    uploadFile,
    clearUpload,
    setPreview,
  };
};
