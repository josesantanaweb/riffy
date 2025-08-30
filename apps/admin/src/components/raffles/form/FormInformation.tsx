'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { Icon, Input } from '@riffy/components';
import Editor from './Editor';
import type { CreateRaffleFormData } from '@/validations/raffleSchema';

const FormInformation = () => {
  const [isCollapse, setIsCollapse] = useState(true);

  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<CreateRaffleFormData>();

  const handleCollapse = () => setIsCollapse(prev => !prev);

  const formValues = watch();
  const descriptionValue = formValues.description || '';

  const handleDescriptionChange = (value: string) => {
    setValue('description', value, { shouldValidate: true });
  };

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
                    value={formValues.title || ''}
                    {...register('title')}
                    error={errors.title?.message}
                  />
                </div>
                <div className="w-1/2">
                  <Input
                    label="Fecha del sorteo"
                    isRequired
                    placeholder="yyyy-mm-dd"
                    inputSize="md"
                    type="date"
                    value={formValues.drawDate || ''}
                    {...register('drawDate')}
                    error={errors.drawDate?.message}
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
                    type="number"
                    value={formValues.price || ''}
                    {...register('price')}
                    error={errors.price?.message}
                  />
                </div>
                <div className="w-1/2">
                  <Input
                    label="Valor del premio"
                    isRequired
                    placeholder="Ingresa el valor del premio"
                    inputSize="md"
                    type="number"
                    value={formValues.award || ''}
                    {...register('award')}
                    error={errors.award?.message}
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
                    type="number"
                    value={formValues.totalTickets || ''}
                    {...register('totalTickets')}
                    error={errors.totalTickets?.message}
                  />
                </div>
                <div className="w-1/2">
                  <Input
                    label="Estado"
                    placeholder="Ingresa el Estado"
                    inputSize="md"
                    value={formValues.status || ''}
                    {...register('status')}
                    error={errors.status?.message}
                  />
                </div>
              </div>

              <Editor
                label="Descripción"
                value={descriptionValue}
                setValue={handleDescriptionChange}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormInformation;
