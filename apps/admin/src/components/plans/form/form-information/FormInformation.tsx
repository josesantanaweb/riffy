'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { Icon, Input, Select } from '@riffy/components';
import DynamicInput from '@/components/common/dynamic-input';
import type { FormData } from '@/validations/planSchema';
import { PlanType } from '@riffy/types';

const FormInformation = () => {
  const [isCollapse, setIsCollapse] = useState(true);

  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<FormData>();

  const statusOptions = [
    { value: PlanType.BASIC, label: 'Plan Basico' },
    { value: PlanType.PREMIUM, label: 'Plan Premium' },
    { value: PlanType.ONE_TIME, label: 'Pago Individual' },
  ];

  const handleCollapse = () => setIsCollapse(prev => !prev);

  const formValues = watch();

  return (
    <div className="bg-box-primary rounded-xl relative">
      <div
        className={`flex justify-between items-center px-6 py-4 ${isCollapse ? 'border-b border-line-100' : ''}`}
      >
        <div className="flex items-center gap-2">
          <Icon name="info-circle" className="text-2xl text-body-100" />
          <h5 className="text-base text-title">Información del plan</h5>
        </div>
        <button
          className={`cursor-pointer text-body-100 transition-transform ${isCollapse ? 'rotate-180' : ''}`}
          onClick={handleCollapse}
          type="button"
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
            <div className="flex flex-col px-6 pt-4 pb-8 w-full gap-6">
              <div className="flex gap-4 items-center w-full flex-wrap lg:flex-nowrap">
                <div className="w-full lg:w-1/2">
                  <Input
                    label="Nombre del plan"
                    isRequired
                    placeholder="Ingresa un nombre"
                    inputSize="md"
                    value={formValues.name || ''}
                    {...register('name')}
                    error={errors.name?.message}
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <Select
                    label="Tipo de plan"
                    placeholder="Selecciona el tipo"
                    size="md"
                    options={statusOptions}
                    value={formValues.type || ''}
                    onChange={value =>
                      setValue('type', value as PlanType, {
                        shouldValidate: false,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-4 items-center w-full flex-wrap lg:flex-nowrap">
                <div className="w-full lg:w-1/2">
                  <Input
                    label="Precio del plan"
                    isRequired
                    placeholder="Ingresa el precio del plan"
                    inputSize="md"
                    type="number"
                    value={formValues.price || ''}
                    {...register('price')}
                    error={errors.price?.message}
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <Input
                    label="Cantidad de bingos"
                    placeholder="Ingresa la cantidad de bingos"
                    inputSize="md"
                    type="number"
                    value={formValues.maxBingos || ''}
                    {...register('maxBingos')}
                    error={errors.maxBingos?.message}
                  />
                </div>
              </div>

              <div className="flex gap-4 items-start w-full flex-wrap lg:flex-nowrap">
                <div className="w-full lg:w-1/2">
                  <Input
                    label="Cantidad de cartones"
                    placeholder="Ingresa la cantidad de cartones"
                    inputSize="md"
                    type="number"
                    value={formValues.maxBoards || ''}
                    {...register('maxBoards')}
                    error={errors.maxBoards?.message}
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <DynamicInput
                    name="description"
                    label="Descripción del plan"
                    placeholder="Ingresa una característica del plan"
                    isRequired
                    maxItems={10}
                    error={errors.description?.message}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormInformation;
