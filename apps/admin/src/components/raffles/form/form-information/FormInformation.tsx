'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { Icon, Input, Select, DateInput, Switch } from '@riffy/components';
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

  const { canCreateRaffle, data: planUsage } = usePlanUsage();

  useEffect(() => {
    if (planUsage?.plan?.maxTickets) {
      setValue('totalTickets', String(planUsage.plan.maxTickets), {
        shouldValidate: true,
      });
    }
  }, [planUsage?.plan?.maxTickets, setValue]);

  const statusOptions = [
    { value: 'ACTIVE', label: 'Activo' },
    { value: 'PENDING', label: 'Pendiente' },
    { value: 'COMPLETED', label: 'Finalizada' },
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
          <h5 className="text-base text-title">Información de rifa</h5>
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
                        className={`${canCreateRaffle ? 'text-green-400' : 'text-red-400'}`}
                      >
                        Rifas: {planUsage.currentRaffles}/
                        {planUsage.plan.maxRaffles || '∞'}
                      </div>
                      <div className="text-body-100">
                        Tickets: {planUsage.currentTickets}/
                        {planUsage.plan.maxTickets || '∞'}
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
                    label="Cantidad de boletos"
                    isRequired
                    placeholder="Ingresa la cantidad de boletos"
                    inputSize="md"
                    type="number"
                    value={formValues.totalTickets || ''}
                    disabled={isUpdating}
                    {...register('totalTickets')}
                    error={errors.totalTickets?.message}
                  />
                </div>
              </div>

              <div className="flex gap-4 items-center w-full flex-wrap lg:flex-nowrap">
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
                <div className="w-full lg:w-1/2">
                  <Input
                    label="Minimo de boletos"
                    isRequired
                    min={1}
                    max={3}
                    placeholder="Ingresa el minimo de boletos"
                    inputSize="md"
                    type="number"
                    value={formValues.minTickets || ''}
                    {...register('minTickets')}
                    error={errors.minTickets?.message}
                  />
                </div>
              </div>

              <div className="flex gap-4 items-center w-full flex-wrap lg:flex-nowrap">
                <div className="w-full lg:w-1/2 flex items-start md:items-center gap-5 md:gap-10 flex-col md:flex-row">
                  <Switch
                    checked={formValues.showDate || false}
                    onChange={() =>
                      setValue('showDate', !formValues.showDate, {
                        shouldValidate: false,
                      })
                    }
                    label="Mostrar fecha"
                  />
                  <Switch
                    checked={formValues.showProgress || false}
                    onChange={() =>
                      setValue('showProgress', !formValues.showProgress, {
                        shouldValidate: false,
                      })
                    }
                    label="Mostrar progreso"
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
