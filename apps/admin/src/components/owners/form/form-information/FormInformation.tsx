'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { Icon, Input, Select } from '@riffy/components';
import type { FormData } from '@/validations/ownerSchema';
import { UserStatus } from '@riffy/types';
import { usePlans } from '@riffy/hooks';
import ColorInput from '@/components/common/color-input';

const FormInformation = () => {
  const { data: plans } = usePlans();
  const [isCollapse, setIsCollapse] = useState(true);

  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<FormData>();

  const statusOptions = [
    { value: 'ACTIVE', label: 'Activo' },
    { value: 'INACTIVE', label: 'Inactivo' },
  ];

  const plansOptions = plans?.map(plan => ({
    value: plan.id,
    label: plan.name,
  }));

  const handleCollapse = () => setIsCollapse(prev => !prev);

  const formValues = watch();

  return (
    <div className="bg-base-700 rounded-xl relative">
      <div
        className={`flex justify-between items-center px-6 py-4 ${isCollapse ? 'border-b border-base-600' : ''}`}
      >
        <div className="flex items-center gap-2">
          <Icon name="info-circle" className="text-2xl text-base-300" />
          <h5 className="text-base text-white">Información del dueño</h5>
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
          >
            <div className="flex flex-col px-6 pt-4 pb-8 w-full gap-6">
              <div className="flex gap-4 items-center w-full flex-wrap lg:flex-nowrap">
                <div className="w-full lg:w-1/2">
                  <Input
                    label="Nombre"
                    isRequired
                    placeholder="Ej: Juan Pérez"
                    inputSize="md"
                    value={formValues.name || ''}
                    {...register('name')}
                    error={errors.name?.message}
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <Input
                    label="Email"
                    isRequired
                    placeholder="Ej: juan@correo.com"
                    inputSize="md"
                    type="email"
                    value={formValues.email || ''}
                    {...register('email')}
                    error={errors.email?.message}
                  />
                </div>
              </div>

              <div className="flex gap-4 items-center w-full flex-wrap lg:flex-nowrap">
                <div className="w-full lg:w-1/2">
                  <Input
                    label="Contraseña"
                    placeholder="Dejar vacío para mantener actual"
                    inputSize="md"
                    type="password"
                    value={formValues.password || ''}
                    {...register('password')}
                    error={errors.password?.message}
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <Input
                    label="Dominio"
                    placeholder="Ej: www.example.com"
                    inputSize="md"
                    value={formValues.domain || ''}
                    {...register('domain')}
                    error={errors.domain?.message}
                  />
                </div>
              </div>

              <div className="flex gap-4 items-center w-full flex-wrap lg:flex-nowrap">
                <div className="w-full lg:w-1/2">
                  <Input
                    label="WhatsApp"
                    placeholder="Ej: 04141234567"
                    inputSize="md"
                    value={formValues.whatsapp || ''}
                    {...register('whatsapp')}
                    error={errors.whatsapp?.message}
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <Input
                    label="Instagram"
                    placeholder="Ej: @miCuenta"
                    inputSize="md"
                    value={formValues.instagram || ''}
                    {...register('instagram')}
                    error={errors.instagram?.message}
                  />
                </div>
              </div>

              <div className="flex gap-4 items-center w-full flex-wrap lg:flex-nowrap">
                <div className="w-full lg:w-1/2">
                  <Input
                    label="TikTok"
                    placeholder="Ej: @miCuenta"
                    inputSize="md"
                    value={formValues.tiktok || ''}
                    {...register('tiktok')}
                    error={errors.tiktok?.message}
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
                      setValue('status', value as UserStatus, {
                        shouldValidate: false,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-4 items-center w-full flex-wrap lg:flex-nowrap">
                <div className="w-full lg:w-1/2">
                  <Select
                    label="Plan"
                    placeholder="Selecciona el plan"
                    size="md"
                    options={plansOptions}
                    value={formValues.planId || ''}
                    onChange={value =>
                      setValue('planId', value as string, {
                        shouldValidate: false,
                      })
                    }
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <ColorInput
                    label="Color de Marca"
                    placeholder="#000000"
                    value={formValues.brandColor || ''}
                    register={register}
                    name="brandColor"
                    error={errors.brandColor}
                    onChange={value =>
                      setValue('brandColor', value, { shouldValidate: true })
                    }
                    inputSize="md"
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
