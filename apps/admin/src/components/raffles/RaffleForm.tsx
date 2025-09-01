'use client';
import React, { useEffect, useCallback } from 'react';
import { Breadcrumb, Button, Icon } from '@riffy/components';
import { useRouter, useParams } from 'next/navigation';
import { useCreateRaffle, useRaffle, useUpdateRaffle } from '@riffy/hooks';
import { useToast } from '@/hooks';
import FormInformation from './form/FormInformation';
import FormImages from './form/FormImages';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createRaffleSchema, type FormData } from '@/validations/raffleSchema';
import { ROUTES } from '@/constants';

const DEFAULT_VALUES: FormData = {
  title: '',
  drawDate: new Date(),
  price: '',
  award: '',
  totalTickets: '',
  status: 'ACTIVE',
  description: '',
};

const OWNER_ID = 'cmf1myuv20000fmqj1lgf2end';
const DEFAULT_BANNER = '/images/banner.png';

const RaffleForm = () => {
  const methods = useForm<FormData>({
    resolver: zodResolver(createRaffleSchema),
    mode: 'onChange',
    defaultValues: DEFAULT_VALUES,
  });

  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = methods;

  const router = useRouter();
  const toast = useToast();
  const raffleId = useParams().raffleId as string | undefined;
  const { data: raffleData } = useRaffle(raffleId);
  const { createRaffle, loading: isCreating } = useCreateRaffle();
  const { updateRaffle } = useUpdateRaffle();

  const isUpdating = Boolean(raffleData);

  useEffect(() => {
    if (!raffleData) return;
    reset({
      title: raffleData.title || '',
      drawDate: raffleData.drawDate
        ? new Date(raffleData.drawDate)
        : new Date(),
      price: String(raffleData.price ?? ''),
      award: String(raffleData.award ?? ''),
      totalTickets: String(raffleData.totalTickets ?? ''),
      status: raffleData.status || 'ACTIVE',
      description: raffleData.description || '',
    });
  }, [raffleData, reset]);

  const handleBack = useCallback(() => router.back(), [router]);

  const onSubmit = async (data: FormData) => {
    const { title, status, description, price, award, totalTickets, drawDate } =
      data;

    try {
      const raffleInput = {
        ...data,
        title: title,
        price: Number(price),
        award: Number(award),
        totalTickets: Number(totalTickets),
        drawDate: new Date(drawDate).toISOString(),
        status,
        description,
        ownerId: OWNER_ID,
        banner: DEFAULT_BANNER,
      };

      if (isUpdating && raffleData?.id) {
        await updateRaffle(raffleData.id, raffleInput);
        toast.success('Rifa actualizada exitosamente!!');
      } else {
        await createRaffle(raffleInput);
        toast.success('Rifa creada exitosamente!!');
      }

      router.push(ROUTES.RAFFLES.LIST);
    } catch (error) {
      console.error('Error guardando rifa:', error);
      toast.error('Error guardando rifa');
    }
  };

  const handleCancel = () => {
    reset();
    handleBack();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 flex-col flex gap-6">
          <div className="flex w-full justify-between items-center">
            <div className="flex flex-col">
              <h3 className="text-white text-lg font-semibold">Rifas</h3>
              <Breadcrumb page={isUpdating ? 'Editar Rifa' : 'Crear Rifa'} />
            </div>
            <Button size="md" onClick={handleBack} type="button">
              <Icon name="arrow-back" />
              Volver
            </Button>
          </div>
          <div className="flex flex-col gap-6 w-full">
            <FormInformation />

            <FormImages />

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

export default RaffleForm;
