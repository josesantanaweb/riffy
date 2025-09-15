import { useState, useCallback } from 'react';

export interface PreviewOptions {
  maxSizeMB?: number;
  allowedTypes?: string[];
  onFileSelect?: (file: File | null) => void;
  onError?: (error: string) => void;
}

export interface PreviewState {
  selectedFile: File | null;
  previewUrl: string | null;
  error: string | null;
}

export interface PreviewActions {
  selectFile: (file: File) => void;
  clearFile: () => void;
  setExistingUrl: (url: string | null) => void;
}

const DEFAULT_OPTIONS: Required<Omit<PreviewOptions, 'onFileSelect' | 'onError'>> = {
  maxSizeMB: 10,
  allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
};

export const useImagePreview = (options: PreviewOptions = {}): PreviewState & PreviewActions => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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

  const selectFile = useCallback((file: File): void => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      options.onError?.(validationError);
      return;
    }

    if (previewUrl && selectedFile) {
      URL.revokeObjectURL(previewUrl);
    }

    const newPreviewUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(newPreviewUrl);
    setError(null);
    options.onFileSelect?.(file);
  }, [validateFile, options, previewUrl, selectedFile]);

  const clearFile = useCallback(() => {
    if (previewUrl && selectedFile) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    options.onFileSelect?.(null);
  }, [previewUrl, selectedFile, options]);

  const setExistingUrl = useCallback((url: string | null) => {
    if (previewUrl && selectedFile) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(url);
    setError(null);
  }, [previewUrl, selectedFile]);

  return {
    selectedFile,
    previewUrl,
    error,
    selectFile,
    clearFile,
    setExistingUrl,
  };
};
