'use client';
import React, { useEffect, useCallback } from 'react';
import { Button } from '@riffy/components';
import { useRouter, useParams } from 'next/navigation';
import {
  useUpdatePaymentMethod,
  usePaymentMethod,
  useCreatePaymentMethod,
} from '@riffy/hooks';
import { CreatePaymentMethodInput, PaymentMethodType } from '@riffy/types';
import { useToast } from '@/hooks';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentMethodSchema, type FormData } from '@/validations/paymentMethodSchema';
import { ROUTES } from '@/constants';
import FormInformation from './form-information';
import PageHeader from '@/components/common/page-header';

const DEFAULT_VALUES: FormData = {
  type: PaymentMethodType.PAGO_MOVIL,
  bankName: undefined,
  phoneNumber: undefined,
  nationalId: undefined,
  binanceId: undefined,
  paypalEmail: undefined,
};

const PaymentMethodsForm = () => {
  const methods = useForm<FormData>({
    resolver: zodResolver(paymentMethodSchema),
    mode: 'onTouched',
    defaultValues: DEFAULT_VALUES,
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
    reset,
  } = methods;

  const router = useRouter();
  const toast = useToast();
  const paymentMethodId = useParams().paymentMethodId as string | undefined;
  const { data: paymentMethodData } = usePaymentMethod(paymentMethodId);
  const { createPaymentMethod, loading: isCreating } = useCreatePaymentMethod();
  const { updatePaymentMethod } = useUpdatePaymentMethod();

  const isUpdating = Boolean(paymentMethodData);

  useEffect(() => {
    if (!paymentMethodData) return;
    reset({
      type: paymentMethodData.type,
      bankName: paymentMethodData.bankName || '',
      phoneNumber: paymentMethodData.phoneNumber || '',
      nationalId: paymentMethodData.nationalId || '',
      binanceId: paymentMethodData.binanceId || '',
      paypalEmail: paymentMethodData.paypalEmail || '',
    });
  }, [paymentMethodData, reset]);

  const handleBack = useCallback(() => router.back(), [router]);

  const onSubmit = async (data: FormData) => {
    try {
      const paymentMethodInput: CreatePaymentMethodInput = {
        type: data.type,
        ...(data.type === PaymentMethodType.PAGO_MOVIL ? {
          bankName: data.bankName,
          phoneNumber: data.phoneNumber,
          nationalId: data.nationalId,
          binanceId: null,
          paypalEmail: null,
        } : data.type === PaymentMethodType.BINANCE_PAY ? {
          binanceId: data.binanceId,
          bankName: null,
          phoneNumber: null,
          nationalId: null,
          paypalEmail: null,
        } : data.type === PaymentMethodType.PAYPAL ? {
          paypalEmail: data.paypalEmail,
          bankName: null,
          phoneNumber: null,
          nationalId: null,
          binanceId: null,
        } : {})
      };

      if (isUpdating && paymentMethodData?.id) {
        await updatePaymentMethod(paymentMethodData.id, paymentMethodInput);
        toast.success('Método de Pago actualizado exitosamente!!');
      } else {
        await createPaymentMethod(paymentMethodInput);
        toast.success('Método de Pago creado exitosamente!!');
      }

      router.push(ROUTES.PAYMENT_METHODS.LIST);
    } catch {
      toast.error('Error guardando método de pago');
    }
  };

  const handleCancel = () => {
    reset();
    handleBack();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="py-6 px-3 lg:px-6 flex-col flex gap-6">
          <PageHeader
            title={isUpdating ? 'Editar Método de Pago' : 'Crear Método de Pago'}
            subtitle="Gestión de Métodos de Pago"
            showBackButton
          />
          <div className="flex flex-col gap-6 w-full">
            <FormInformation />

            <div className="flex items-center justify-end gap-3">
              <Button
                variant="default"
                size="md"
                onClick={handleCancel}
                type="button"
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                size="md"
                type="submit"
                disabled={!isValid || isSubmitting || isCreating}
              >
                {isSubmitting || isCreating ? 'Guardando...' : 'Guardar'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default PaymentMethodsForm;
