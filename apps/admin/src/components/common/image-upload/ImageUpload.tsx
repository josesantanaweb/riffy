'use client';
import { useMemo } from 'react';
import Image from 'next/image';
import { Icon } from '@riffy/components';
import { useImageUpload } from '@/hooks';
import type { UploadOptions } from '@/hooks/useImageUpload';

export interface ImageUploadProps {
  width?: number;
  height?: number;
  placeholder?: string;
  placeholderIcon?: 'plus-circle' | 'image' | 'user';
  placeholderSubtext?: string;
  value?: string;
  onChange?: (url: string | null) => void;
  uploadOptions?: UploadOptions;
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
  uploadOptions = {},
  className = '',
  disabled = false,
}: ImageUploadProps) => {
  const { isUploading, uploadedUrl, previewUrl, uploadFile, clearUpload } =
    useImageUpload({
      ...uploadOptions,
      onSuccess: url => {
        uploadOptions.onSuccess?.(url);
        onChange?.(url);
      },
    });

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file || disabled) return;
    await uploadFile(file);
  };

  const handleDeleteImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    clearUpload();
    onChange?.(null);
  };

  const inputId = useMemo(
    () => `image-upload-${Math.random().toString(36).substr(2, 9)}`,
    [],
  );
  const displayImage = previewUrl || uploadedUrl || value;
  const hasCustomImage = Boolean(displayImage && displayImage.trim());

  return (
    <div className={`relative ${className}`}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading || disabled}
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
        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
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
              {isUploading ? 'Subiendo...' : placeholder}
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
