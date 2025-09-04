'use client';
import { useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Icon } from '@riffy/components';
import { useImagePreview } from '@/hooks/useImagePreview';

export interface ImageUploadProps {
  width?: number;
  height?: number;
  placeholder?: string;
  placeholderIcon?: 'plus-circle' | 'image' | 'user';
  placeholderSubtext?: string;
  value?: string;
  onChange?: (file: File | null, existingUrl?: string | null) => void;
  maxSizeMB?: number;
  className?: string;
  disabled?: boolean;
}

const ImageUpload = ({
  width = 300,
  height = 200,
  placeholder = 'Agregar imagen',
  placeholderSubtext = 'JPEG, PNG, WebP, GIF (máx. 10MB)',
  value,
  onChange,
  maxSizeMB = 10,
  className = '',
  disabled = false,
}: ImageUploadProps) => {
  const { selectedFile, previewUrl, error, selectFile, clearFile, setExistingUrl } =
    useImagePreview({
      maxSizeMB,
      onFileSelect: (file) => onChange?.(file, value),
      onError: (error) => console.error('Error de validación:', error),
    });

  useEffect(() => {
    if (value && !selectedFile) {
      setExistingUrl(value);
    }
  }, [value, selectedFile, setExistingUrl]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || disabled) return;
    selectFile(file);
  };

  const handleDeleteImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    clearFile();
    onChange?.(null, null);
  };

  const inputId = useMemo(
    () => `image-upload-${Math.random().toString(36).substr(2, 9)}`,
    [],
  );
  const displayImage = previewUrl || value;
  const hasCustomImage = Boolean(displayImage && displayImage.trim());
  const hasNewFile = Boolean(selectedFile);

  return (
    <div className={`relative ${className}`}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
        id={inputId}
      />

      <label
        htmlFor={inputId}
        className={`
          relative block rounded-lg cursor-pointer transition-all overflow-hidden
          ${
            hasCustomImage
              ? 'border-2 border-transparent hover:border-base-600'
              : 'border-2 border-dashed border-base-500 hover:border-base-400'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        style={{ width, height }}
      >
        {hasNewFile && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded z-20">
            Nuevo archivo
          </div>
        )}

        {hasCustomImage && !disabled && (
          <button
            type="button"
            onClick={handleDeleteImage}
            className="absolute top-2 right-2 opacity-70 hover:opacity-100 bg-base-700 hover:bg-base-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm z-20 transition-colors rotate-45"
            title="Eliminar imagen"
          >
            <Icon name="plus" className="text-2xl" />
          </button>
        )}

        {hasCustomImage ? (
          <>
            <Image
              src={displayImage}
              alt="Imagen subida"
              width={width}
              height={height}
              className="w-full h-full object-cover rounded-lg"
            />
            {!disabled && (
              <div className="opacity-0 hover:opacity-100 transition-opacity absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="flex flex-col items-center text-white">
                  <Icon name="edit" className="text-2xl mb-1" />
                  <span className="text-sm">Cambiar imagen</span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-base-300 gap-2">
            <Icon name="edit" className="text-2xl" />
            <p className="text-sm font-medium">
              {placeholder}
            </p>
            {placeholderSubtext && (
              <p className="text-xs text-base-400">{placeholderSubtext}</p>
            )}
          </div>
        )}
      </label>
    </div>
  );
};

export default ImageUpload;
