'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { Icon, Input, Select, Editor, DateInput, Switch } from '@riffy/components';
import type { FormData } from '@/validations/raffleSchema';
import { usePlanUsage } from '@riffy/hooks';

interface FormInformationProps {
  isUpdating?: boolean;
}

const FormInformation = ({ isUpdating = false }: FormInformationProps) => {
  const [isCollapse, setIsCollapse] = useState(true);

  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<FormData>();

  const { canCreateBingo, data: planUsage } = usePlanUsage();

  useEffect(() => {
    if (planUsage?.plan?.maxBoards) {
      setValue('totalBoards', String(planUsage.plan.maxBoards), {
        shouldValidate: true,
      });
    }
  }, [planUsage?.plan?.maxBoards, setValue]);

  const statusOptions = [
    { value: 'ACTIVE', label: 'Activo' },
    { value: 'PENDING', label: 'Pendiente' },
    { value: 'COMPLETED', label: 'Finalizada' },
  ];

  const handleCollapse = () => setIsCollapse(prev => !prev);

  const formValues = watch();
  const descriptionValue = formValues.description || '';

  const handleDescriptionChange = (value: string) => {
    setValue('description', value, { shouldValidate: true });
  };

  return (
    <div className="bg-box-primary rounded-xl relative">
      <div
        className={`flex justify-between items-center px-6 py-4 ${isCollapse ? 'border-b border-line-100' : ''}`}
      >
        <div className="flex items-center gap-2">
          <Icon name="info-circle" className="text-2xl text-body-100" />
          <h5 className="text-base text-title">Información de rifa</h5>
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
            <div className="flex flex-col px-6 pt-4 pb-8 w-full gap-6">
              {!isUpdating && planUsage?.plan && (
                <div className="bg-box-secondary rounded-lg p-4 mb-2">
                  <div className="flex items-center justify-center md:justify-between flex-col md:flex-row gap-2">
                    <div className="flex items-center gap-2">
                      <Icon name="info-circle" className="text-body-100" />
                      <span className="text-sm text-body-100">
                        Límites de tu plan
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm items-center">
                      <div
                        className={`${canCreateBingo ? 'text-green-400' : 'text-red-400'}`}
                      >
                        Bingos: {planUsage.currentBingos}/
                        {planUsage.plan.maxBingos || '∞'}
                      </div>
                      <div className="text-body-100">
                        Boards: {planUsage.currentBoards}/
                        {planUsage.plan.maxBoards || '∞'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex gap-4 items-center w-full flex-wrap lg:flex-nowrap">
                <div className="w-full lg:w-1/2">
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
                <div className="w-full lg:w-1/2">
                  <DateInput
                    label="Fecha del sorteo"
                    date={new Date(formValues.drawDate)}
                    setDate={date =>
                      setValue('drawDate', date, {
                        shouldValidate: true,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-4 items-center w-full flex-wrap lg:flex-nowrap">
                <div className="w-full lg:w-1/2">
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
                <div className="w-full lg:w-1/2">
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

              <div className="flex gap-4 items-center w-full flex-wrap lg:flex-nowrap">
                <div className="w-full lg:w-1/2">
                  <Input
                    label="Cantidad de boletos"
                    isRequired
                    placeholder="Ingresa la cantidad de boletos"
                    inputSize="md"
                    type="number"
                    value={formValues.totalBoards || ''}
                    disabled={true}
                    {...register('totalBoards')}
                    error={errors.totalBoards?.message}
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <Select
                    label="Estado"
                    placeholder="Selecciona el estado"
                    size="md"
                    options={statusOptions}
                    value={formValues.status || ''}
                    onChange={value =>
                      setValue('status', value, { shouldValidate: false })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-4 items-center w-full flex-wrap lg:flex-nowrap">
                <div className="w-full">
                  <Editor
                    label="Descripción"
                    value={descriptionValue}
                    setValue={handleDescriptionChange}
                  />
                </div>
              </div>

              <div className="flex gap-4 items-center w-full flex-wrap lg:flex-nowrap">
                <div className="w-full lg:w-1/2 flex items-start md:items-center gap-5 md:gap-10 flex-col md:flex-row">
                  <Switch
                    checked={formValues.showDate || false}
                    onChange={() =>
                      setValue('showDate', !formValues.showDate, { shouldValidate: false })
                    }
                    label="Mostrar fecha"
                  />
                  <Switch
                    checked={formValues.showProgress || false}
                    onChange={() =>
                      setValue('showProgress', !formValues.showProgress, { shouldValidate: false })
                    }
                    label="Mostrar progreso"
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <Input
                    label="Minimo de boletos"
                    isRequired
                    min={1}
                    max={3}
                    placeholder="Ingresa el minimo de boletos"
                    inputSize="md"
                    type="number"
                    value={formValues.minBoards || ''}
                    {...register('minBoards')}
                    error={errors.minBoards?.message}
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
