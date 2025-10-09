'use client';
import React, { useEffect, useState, useRef } from 'react';
import type { ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Input, Select, ImageUpload } from '@riffy/components';
import { useStore } from '@/store';
import { useForm } from 'react-hook-form';
import { paymentSchema, type FormData } from '@/validations/paymentSchema';
import {
  useCreatePayment,
  useUserByDomain,
  usePaymentByNationalId,
} from '@riffy/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import Total from '@/components/common/total';
import PaymentMethod from '../payment-method';
import { useToast } from '@/hooks';
import Alert from '@/components/common/alert/Alert';
import Search from '@/components/common/search/Search';
import PendingPayment from '../payment-pending';
import { uploadImageToS3 } from '@/utils/imageUpload';
import { stateOptions } from './states';
import type { Payment } from '@riffy/types';

const PaymentForm = (): ReactElement => {
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const [searchNationalId, setSearchNationalId] = useState<string>('');
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [isExistingUser, setIsExistingUser] = useState<boolean>(false);
  const [isOpenPendingPayment, setIsOpenPendingPayment] =
    useState<boolean>(false);
  const [createdPayment, setCreatedPayment] = useState<Payment | null>(null);
  const lastProcessedPaymentId = useRef<string | null>(null);
  const toast = useToast();
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

  const { cart, user, loading, setUser, setLoading } = useStore();
  const { createPayment } = useCreatePayment();
  const { data: consultPayment, loading: consultPaymentLoading } =
    usePaymentByNationalId(searchNationalId);
  const { data: userData, loading: userLoading } = useUserByDomain(
    String(process.env.NEXT_PUBLIC_DEFAULT_DOMAIN),
  );

  const paymentMethodsLoaded =
    user?.paymentMethods && user.paymentMethods.length > 0;
  const isLoading = loading || userLoading;

  useEffect(() => {
    if (userData && !user?.paymentMethods) {
      setUser(userData);
      setLoading(false);
    }
  }, [userData, user?.paymentMethods, setUser, setLoading]);

  useEffect(() => {
    if (hasSearched && !consultPaymentLoading) {
      if (consultPayment) {
        setIsExistingUser(true);

        if (consultPayment.id !== lastProcessedPaymentId.current) {
          lastProcessedPaymentId.current = consultPayment.id;

          if (consultPayment.buyerName) {
            setValue('buyerName', consultPayment.buyerName, {
              shouldValidate: true,
            });
          }
          if (consultPayment.email) {
            setValue('email', consultPayment.email, { shouldValidate: true });
          }
          if (consultPayment.phone) {
            setValue('phone', consultPayment.phone, { shouldValidate: true });
          }
          if (consultPayment.state) {
            setValue('state', consultPayment.state, { shouldValidate: true });
          }
          if (consultPayment.paymentMethod) {
            setValue('paymentMethod', consultPayment.paymentMethod, {
              shouldValidate: true,
            });
          }
        }
      } else {
        setIsExistingUser(false);
      }
    }
  }, [consultPayment, consultPaymentLoading, hasSearched, setValue, toast]);

  const handleChangeProofUrl = (
    file: File | null,
    existingUrl?: string | null,
  ) => {
    if (file) {
      setValue('proofFile', file, { shouldValidate: true });
      setValue('proofUrl', existingUrl || '', { shouldValidate: true });
    } else {
      unregister('proofFile');
      setValue('proofUrl', existingUrl || '', { shouldValidate: true });
    }
  };

  const handleSearchNationalId = () => {
    const nationalId = watch('nationalId');
    if (nationalId) {
      lastProcessedPaymentId.current = null;
      setHasSearched(true);
      setSearchNationalId(nationalId);
    }
  };

  const getAlertMessage = () => {
    if (!hasSearched) {
      return 'Ingresa tu cédula de identidad y presiona el icono de búsqueda para continuar';
    }

    if (isExistingUser) {
      return 'Usuario encontrado. Puedes continuar con el pago.';
    }

    return 'Eres un nuevo usuario, ingresa tus datos para continuar con el pago';
  };

  const getAlertType = isExistingUser ? 'success' : 'warning';

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'nationalId' && hasSearched) {
        if (!value.nationalId || value.nationalId.trim() === '') {
          setHasSearched(false);
          setIsExistingUser(false);
          lastProcessedPaymentId.current = null;
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, hasSearched]);

  const onSubmit = async (data: FormData) => {
    try {
      let finalProofUrl = data.proofUrl || '';

      if (data.proofFile) {
        setIsUploadingImage(true);
        try {
          finalProofUrl = await uploadImageToS3(data.proofFile, {
            folder: 'payments',
          });
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
        email: data.email,
        state: data.state,
        paymentMethod: data.paymentMethod,
        proofUrl: finalProofUrl,
        ticketIds: cart?.ticketIds || [],
        amount: (cart?.price || 0) * (cart?.totalTickets || 0),
        raffleId: cart?.raffleId || '',
      });

      if (result.errors) {
        toast.error('Error al crear el pago');
        return;
      }

      setCreatedPayment(result.data.createPayment);
      setIsOpenPendingPayment(true);
      reset();
    } catch {
      toast.error('Error al crear el pago');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <Alert
        message={getAlertMessage()}
        icon={isExistingUser ? 'check-circle' : 'info-circle'}
        type={getAlertType}
      />
      <div className="relative min-h-[400px] flex flex-col gap-3 mt-3">
        <div className="flex flex-col gap-3">
          <Search
            placeholder="Cédula de identidad"
            isRequired
            value={watch('nationalId') || ''}
            error={errors.nationalId?.message || ''}
            loading={consultPaymentLoading}
            onClick={handleSearchNationalId}
            onChange={e =>
              setValue('nationalId', e.target.value, { shouldValidate: true })
            }
          />

          <AnimatePresence>
            {hasSearched && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="flex flex-col gap-3 overflow-hidden"
              >
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
                      ? 'Cargando métodos de pago...'
                      : !paymentMethodsLoaded
                        ? 'No hay métodos de pago disponibles'
                        : 'Método de pago'
                  }
                  options={
                    user?.paymentMethods?.map(paymentMethod => ({
                      value: paymentMethod.name,
                      label: paymentMethod.name,
                    })) || []
                  }
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
                    paymentMethod={user.paymentMethods.find(
                      pm => pm.name === watch('paymentMethod'),
                    )}
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full max-w-md bg-base-800 flex flex-col gap-3">
        <Total
          totalTickets={cart?.totalTickets || 0}
          price={cart?.price || null}
        />

        <Button
          variant="primary"
          isFull
          type="submit"
          className="mt-3"
          disabled={!isValid || isUploadingImage}
        >
          {isUploadingImage ? 'Realizando compra...' : 'Pagar'}
        </Button>
      </div>
      {createdPayment && (
        <PendingPayment isOpen={isOpenPendingPayment} data={createdPayment} />
      )}
    </form>
  );
};

export default PaymentForm;
