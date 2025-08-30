'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon, Input } from '@riffy/components';
import Editor from './Editor';

const FormInformation = () => {
  const [title, setTitle] = useState<string>('');
  const [value, setValue] = useState('');
  const [isCollapse, setIsCollapse] = useState(true);

  const handleCollapse = () => setIsCollapse(prev => !prev);

  return (
    <div className="bg-base-700 rounded-xl relative">
      <div
        className={`flex justify-between items-center px-6 py-4 ${isCollapse ? 'border-b border-base-600' : ''}`}
      >
        <div className="flex items-center gap-2">
          <Icon name="info-circle" className="text-2xl text-base-300" />
          <h5 className="text-base text-white">Información de rifa</h5>
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
            <div className="flex flex-col px-6 py-4 w-full gap-6">
              <div className="flex gap-4 items-center w-full">
                <div className="w-1/2">
                  <Input
                    label="Título"
                    isRequired
                    placeholder="Ingresa un titulo"
                    inputSize="md"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <Input
                    label="Fecha del sorteo"
                    isRequired
                    placeholder="dd/mm/yyyy"
                    inputSize="md"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-4 items-center w-full">
                <div className="w-1/2">
                  <Input
                    label="Precio del boleto"
                    isRequired
                    placeholder="Ingresa el precio del boleto"
                    inputSize="md"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <Input
                    label="Valor del premio"
                    isRequired
                    placeholder="Ingresa el valor del premio"
                    inputSize="md"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-4 items-center w-full">
                <div className="w-1/2">
                  <Input
                    label="Cantidad de boletos"
                    isRequired
                    placeholder="Ingresa la cantidad de boletos"
                    inputSize="md"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <Input
                    label="Estado"
                    placeholder="Ingresa el Estado"
                    inputSize="md"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>
              </div>

              <Editor label="Descripción" value={value} setValue={setValue} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormInformation;
