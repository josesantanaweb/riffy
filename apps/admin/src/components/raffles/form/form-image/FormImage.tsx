'use client';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon, ImageUpload } from '@riffy/components';

export interface BannerContext {
  file: File | null;
  url: string | null;
}

const FormImage = () => {
  const [isCollapse, setIsCollapse] = useState(true);
  const { setValue, watch } = useFormContext();
  const currentBanner = watch('banner');

  const handleCollapse = () => setIsCollapse(prev => !prev);

  const handleBannerChange = (file: File | null, existingUrl?: string | null) => {
    if (file) {
      setValue('bannerFile', file);
      setValue('banner', existingUrl || '');
    } else {
      setValue('bannerFile', null);
      setValue('banner', existingUrl || '');
    }
  };

  return (
    <div className="bg-box-primary rounded-xl relative">
      <div
        className={`flex justify-between items-center px-6 py-4 ${isCollapse ? 'border-b border-line-100' : ''}`}
      >
        <div className="flex items-center gap-2">
          <Icon name="image" className="text-2xl text-body-100" />
          <h5 className="text-base text-title">Imagenes</h5>
        </div>
        <button
          className={`cursor-pointer text-body-100 transition-transform ${isCollapse ? 'rotate-180' : ''}`}
          onClick={handleCollapse}
        >
          <Icon name="chevron-down" className="text-2xl" />
        </button>
      </div>
      <AnimatePresence initial={true}>
        {isCollapse && (
          <motion.div
            key="info-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="flex items-center px-6 py-4 w-full justify-center lg:justify-start">
              <ImageUpload
                width={250}
                height={200}
                placeholder="Agregar imagen de banner"
                placeholderIcon="plus-circle"
                placeholderSubtext="JPEG, PNG, WebP, GIF (máx. 10MB)"
                value={currentBanner}
                onChange={handleBannerChange}
                maxSizeMB={10}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormImage;
