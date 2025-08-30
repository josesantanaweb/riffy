'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@riffy/components';
import { ASSETS } from '@/constants';

const FormImages = () => {
  const [isCollapse, setIsCollapse] = useState(true);

  const handleCollapse = () => setIsCollapse(prev => !prev);

  return (
    <div className="bg-base-700 rounded-xl relative">
      <div
        className={`flex justify-between items-center px-6 py-4 ${isCollapse ? 'border-b border-base-600' : ''}`}
      >
        <div className="flex items-center gap-2">
          <Icon name="image" className="text-2xl text-base-300" />
          <h5 className="text-base text-white">Imagenes</h5>
        </div>
        <button
          className={`cursor-pointer text-base-300 transition-transform ${isCollapse ? 'rotate-180' : ''}`}
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
            <div className="flex items-center px-6 py-4 w-full gap-6">
              <div className="flex items-center justify-center flex-col text-base-300 gap-1 rounded-lg w-[150px] h-[120px] border border-dashed border-base-500 cursor-pointer">
                <Icon name="plus-circle" className="text-2xl" />
                <p className="text-sm">Agregar imagen</p>
              </div>
              <div className="relative">
                <div className="opacity-70 hover:opacity-100 transition-opacity -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 flex items-center justify-center bg-base-700 w-8 h-8 rounded-full rotate-45">
                  <Icon name="plus" className="text-2xl text-white" />
                </div>
                <Image
                  src={ASSETS.IMAGES.BANNER}
                  alt="Imagen del cliente"
                  width={200}
                  height={200}
                  className="rounded-lg w-[150px] h-[120px]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormImages;
