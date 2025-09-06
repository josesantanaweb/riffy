'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { Icon, Input, Select } from '@riffy/components';
import type { FormData } from '@/validations/paymentMethodSchema';
import { PaymentMethodType } from '@riffy/types';

const PAYMENT_METHOD_OPTIONS = [
  { value: PaymentMethodType.PAGO_MOVIL, label: 'Pago Móvil' },
  { value: PaymentMethodType.BINANCE_PAY, label: 'Binance Pay' },
  { value: PaymentMethodType.PAYPAL, label: 'PayPal' },
];

const FormInformation = () => {
  const [isCollapse, setIsCollapse] = useState(true);

  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<FormData>();

  const handleCollapse = () => setIsCollapse(prev => !prev);

  const formValues = watch();
  const paymentType = formValues.type;

  const handleTypeChange = (newType: FormData['type']) => {
    setValue('type', newType, { shouldValidate: true });

    switch (newType) {
      case PaymentMethodType.PAGO_MOVIL:
        setValue('binanceId', '');
        setValue('paypalEmail', '');
        break;
      case PaymentMethodType.BINANCE_PAY:
        setValue('bankName', '');
        setValue('phoneNumber', '');
        setValue('nationalId', '');
        setValue('paypalEmail', '');
        break;
      case PaymentMethodType.PAYPAL:
        setValue('bankName', '');
        setValue('phoneNumber', '');
        setValue('nationalId', '');
        setValue('binanceId', '');
        break;
    }
  };

  return (
    <div className="bg-base-700 rounded-xl relative">
      <div
        className={`flex justify-between items-center px-6 py-4 ${isCollapse ? 'border-b border-base-600' : ''}`}
      >
        <div className="flex items-center gap-2">
          <Icon name="info-circle" className="text-2xl text-base-300" />
          <h5 className="text-base text-white">Información del metodo de pago</h5>
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
              <div className="flex gap-4 items-center w-full flex-wrap lg:flex-nowrap">
                <div className="w-full lg:w-1/2">
                  <Select
                    label="Tipo de Método de Pago"
                    placeholder="Selecciona el tipo"
                    size="md"
                    options={PAYMENT_METHOD_OPTIONS}
                    value={formValues.type}
                    onChange={(value) =>
                      handleTypeChange(value as FormData['type'])
                    }
                  />
                  {errors.type && (
                    <span className="text-red-400 text-sm mt-1 block">
                      {errors.type.message}
                    </span>
                  )}
                </div>
              </div>

              {paymentType === PaymentMethodType.PAGO_MOVIL && (
                <>
                  <div className="flex gap-4 items-center w-full flex-wrap lg:flex-nowrap">
                    <div className="w-full lg:w-1/2">
                      <Input
                        label="Nombre del Banco"
                        isRequired
                        placeholder="Ej: Banco de Venezuela"
                        inputSize="md"
                        value={formValues.bankName || ''}
                        {...register('bankName')}
                        error={errors.bankName?.message}
                      />
                    </div>
                    <div className="w-full lg:w-1/2">
                      <Input
                        label="Número de Teléfono"
                        isRequired
                        placeholder="Ej: 04141234567"
                        inputSize="md"
                        value={formValues.phoneNumber || ''}
                        {...register('phoneNumber')}
                        error={errors.phoneNumber?.message}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 items-center w-full flex-wrap lg:flex-nowrap">
                    <div className="w-full lg:w-1/2">
                      <Input
                        label="Cédula de Identidad"
                        isRequired
                        placeholder="Ej: 12345678"
                        inputSize="md"
                        value={formValues.nationalId || ''}
                        {...register('nationalId')}
                        error={errors.nationalId?.message}
                      />
                    </div>
                  </div>
                </>
              )}

              {paymentType === PaymentMethodType.BINANCE_PAY && (
                <div className="flex gap-4 items-center w-full">
                  <div className="w-full lg:w-1/2">
                    <Input
                      label="Binance ID"
                      placeholder="Ej: 1234567890"
                      inputSize="md"
                      value={formValues.binanceId || ''}
                      {...register('binanceId')}
                      error={errors.binanceId?.message}
                    />
                  </div>
                </div>
              )}

              {paymentType === PaymentMethodType.PAYPAL && (
                <div className="flex gap-4 items-center w-full flex-wrap lg:flex-nowrap">
                  <div className="w-1/2">
                    <Input
                      label="Email de PayPal"
                      isRequired
                      placeholder="Ej: example@paypal.com"
                      inputSize="md"
                      type="email"
                      value={formValues.paypalEmail || ''}
                      {...register('paypalEmail')}
                      error={errors.paypalEmail?.message}
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormInformation;
