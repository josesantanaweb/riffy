'use client';
import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { Button, Input, Select, ImageUpload } from '@riffy/components';
import { useStore } from '@/store';
import { useForm } from 'react-hook-form';
import { paymentSchema, type FormData } from '@/validations/paymentSchema';
import { useCreatePayment, useUserByDomain } from '@riffy/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import Total from '@/components/common/total';
import PaymentMethod from '../payment-method';
import { useToast } from '@/hooks';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants';
import { uploadImageToS3 } from '@/utils/imageUpload';
import { stateOptions } from './states';

const PaymentForm = (): ReactElement => {
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const methods = useForm<FormData>({
    resolver: zodResolver(paymentSchema),
    mode: 'onChange',
  });

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    unregister,
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

  const handleChangeProofUrl = (file: File | null, existingUrl?: string | null) => {
    if (file) {
      setValue('proofFile', file, { shouldValidate: true });
      setValue('proofUrl', existingUrl || '', { shouldValidate: true });
    } else {
      unregister('proofFile');
      setValue('proofUrl', existingUrl || '', { shouldValidate: true });
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      let finalProofUrl = data.proofUrl || '';

      if (data.proofFile) {
        setIsUploadingImage(true);
        try {
          finalProofUrl = await uploadImageToS3(data.proofFile, { folder: 'payments' });
        } catch {
          toast.error('Error al subir la imagen del comprobante');
          setIsUploadingImage(false);
          return;
        } finally {
          setIsUploadingImage(false);
        }
      }

      const result = await createPayment({
        buyerName: data.buyerName,
        phone: data.phone,
        nationalId: data.nationalId,
        state: data.state,
        paymentMethod: data.paymentMethod,
        proofUrl: finalProofUrl,
        ticketIds: payment?.ticketIds || [],
        amount: (payment?.price || 0) * (payment?.totalTickets || 0),
      });

      if (result.errors) {
        toast.error('Error al crear el pago');
        return;
      }

      toast.success('Pago creado exitosamente');
      reset();

      setTimeout(() => {
        router.push(ROUTES.RAFFLES.LIST);
      }, 1000);
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
                shouldValidate: true,
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
                shouldValidate: true,
              })
            }
            disabled={isLoading || !paymentMethodsLoaded}
          />

          {watch('paymentMethod') && user?.paymentMethods && (
            <PaymentMethod
              paymentMethod={user.paymentMethods.find(pm => pm.name === watch('paymentMethod'))}
            />
          )}

          <div className="relative w-full flex justify-center">
            <ImageUpload
              height={200}
              placeholder="Sube imagen de comprobante de pago"
              placeholderIcon="plus-circle"
              placeholderSubtext="JPEG, PNG, WebP, GIF (máx. 10MB)"
              value={watch('proofUrl')}
              onChange={handleChangeProofUrl}
              maxSizeMB={10}
              className="w-full"
              disabled={isUploadingImage}
            />
          </div>
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
        disabled={!isValid || isUploadingImage}
      >
        {isUploadingImage ? 'Subiendo comprobante...' : 'Pagar'}
      </Button>
    </form>
  );
};

export default PaymentForm;
