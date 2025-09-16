'use client';
import React, { useEffect } from 'react';
import type { ReactElement } from 'react';
import { Button, Input, Select } from '@riffy/components';
import { useStore } from '@/store';
import { useForm } from 'react-hook-form';
import { paymentSchema, type FormData } from '@/validations/paymentSchema';
import { useCreatePayment, useUserByDomain } from '@riffy/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import Total from '@/components/common/total';
import PaymentMethod from '../payment-method';
import { useToast } from '@/hooks';
import router from 'next/router';
import { ROUTES } from '@/constants';

const stateOptions = [
  { value: 'Caracas', label: 'Caracas' },
  { value: 'Trujillo', label: 'Trujillo' },
  { value: 'Barinas', label: 'Barinas' },
  { value: 'Mérida', label: 'Mérida' },
  { value: 'Portuguesa', label: 'Portuguesa' },
];

const PaymentForm = (): ReactElement => {
  const toast = useToast();
  const methods = useForm<FormData>({
    resolver: zodResolver(paymentSchema),
    mode: 'onTouched',
  });

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors, isValid },
    watch,
  } = methods;

  const { payment, user, loading, setUser, setLoading } = useStore();
  const { createPayment } = useCreatePayment();

  const { data: userData, loading: userLoading } = useUserByDomain('demo.com');

  const paymentMethodsLoaded = user?.paymentMethods && user.paymentMethods.length > 0;
  const isLoading = loading || userLoading;

  useEffect(() => {
    if (userData && !user?.paymentMethods) {
      setUser(userData);
      setLoading(false);
    }
  }, [userData, user?.paymentMethods, setUser, setLoading]);

  const onSubmit = async (data: FormData) => {
    try {
      await createPayment({
        buyerName: data.buyerName,
        phone: data.phone,
        nationalId: data.nationalId,
        state: data.state,
        paymentMethod: data.paymentMethod,
        proofUrl: '',
        ticketIds: payment?.ticketIds || [],
        amount: (payment?.price || 0) * (payment?.totalTickets || 0),
      });
      toast.success('Pago creado exitosamente');
      router.push(ROUTES.RAFFLES.LIST);
      reset();
    } catch {
      toast.error('Error al crear el pago');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative min-h-[400px] flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <Input
            isRequired
            placeholder="Nombre completo"
            inputSize="lg"
            value={watch('buyerName') || ''}
            {...register('buyerName')}
            error={errors.buyerName?.message}
          />
          <Input
            isRequired
            placeholder="Correo electrónico"
            inputSize="lg"
            value={watch('email') || ''}
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            placeholder="Teléfono"
            isRequired
            value={watch('phone') || ''}
            {...register('phone')}
            error={errors.phone?.message}
          />
          <Input
            placeholder="Cédula de identidad"
            isRequired
            value={watch('nationalId') || ''}
            {...register('nationalId')}
            error={errors.nationalId?.message}
          />

          <Select
            placeholder="Selecciona el estado"
            options={stateOptions}
            size="lg"
            value={watch('state') || ''}
            onChange={value =>
              setValue('state', value as string, {
                shouldValidate: false,
              })
            }
          />
          <Select
            placeholder={
              isLoading
                ? "Cargando métodos de pago..."
                : !paymentMethodsLoaded
                  ? "No hay métodos de pago disponibles"
                  : "Método de pago"
            }
            options={user?.paymentMethods?.map(paymentMethod => ({
              value: paymentMethod.name,
              label: paymentMethod.name,
            })) || []}
            size="lg"
            value={watch('paymentMethod') || ''}
            onChange={value =>
              setValue('paymentMethod', value as string, {
                shouldValidate: false,
              })
            }
            disabled={isLoading || !paymentMethodsLoaded}
          />

          {!isLoading && !paymentMethodsLoaded && (
            <div className="w-full border border-yellow-500 rounded-lg p-3 flex flex-col gap-2 my-2">
              <div className="text-center text-yellow-300">
                <p className="text-sm">⚠️ No hay métodos de pago configurados</p>
                <p className="text-xs text-base-300 mt-1">
                  Por favor, contacta al administrador para configurar métodos de pago.
                </p>
              </div>
            </div>
          )}

          {watch('paymentMethod') && user?.paymentMethods && (
            <PaymentMethod
              paymentMethod={user.paymentMethods.find(pm => pm.name === watch('paymentMethod'))}
            />
          )}

          {/* <div className="relative w-full flex justify-center">
            <ImageUpload
              height={200}
              placeholder="Sube imagen de comprobante de pago"
              placeholderIcon="plus-circle"
              placeholderSubtext="JPEG, PNG, WebP, GIF (máx. 10MB)"
              // value={currentBanner}
              onChange={handleChangeProofUrl}
              maxSizeMB={10}
              className="w-full"
            />
          </div> */}
        </div>
      </div>

      <Total
        totalTickets={payment?.totalTickets || 0}
        price={payment?.price || null}
      />

      <Button
        variant="primary"
        isFull
        type="submit"
        className="mt-3"
        disabled={!isValid}
      >
        Pagar
      </Button>
    </form>
  );
};

export default PaymentForm;
