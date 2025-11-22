'use client';
import React, { useEffect, useCallback, useState } from 'react';
import { Button } from '@riffy/components';
import { useRouter, useParams } from 'next/navigation';
import { useCreateRaffle, useRaffle, useUpdateRaffle, usePlanUsage } from '@riffy/hooks';
import { useToast } from '@/hooks';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createRaffleSchema, type FormData } from '@/validations/raffleSchema';
import { ROUTES } from '@/constants';
import { imageUpload } from '@riffy/utils';
import { extractErrorMessage } from '@/utils';
import FormImages from './form-image';
import FormInformation from './form-information';
import PageHeader from '@/components/common/page-header';

const DEFAULT_VALUES: FormData = {
  title: '',
  drawDate: new Date(),
  price: '',
  award: '',
  totalTickets: '',
  status: 'ACTIVE',
  description: '',
  banner: '',
  bannerFile: null,
  showDate: true,
  showProgress: true,
  minTickets: '2',
};

const DEFAULT_BANNER = '/images/banner.png';

const RafflesForm = () => {
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(createRaffleSchema),
    mode: 'onChange',
    defaultValues: DEFAULT_VALUES,
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
    reset,
  } = methods;

  const router = useRouter();
  const toast = useToast();
  const raffleId = useParams().raffleId as string | undefined;
  const { data: raffleData } = useRaffle(raffleId);
  const { createRaffle, loading: isCreating } = useCreateRaffle();
  const { updateRaffle } = useUpdateRaffle();
  const { canCreateBingo, canCreateBoards, bingoLimitMessage, boardLimitMessage } = usePlanUsage();

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
      banner: raffleData.banner || '',
      bannerFile: null,
      showDate: raffleData.showDate ?? true,
      showProgress: raffleData.showProgress ?? true,
      minTickets: String(raffleData.minTickets ?? 2),
    });
  }, [raffleData, reset]);

  const handleBack = useCallback(() => router.back(), [router]);

  const onSubmit = async (data: FormData) => {
    const {
      title,
      status,
      description,
      price,
      award,
      totalTickets,
      drawDate,
      bannerFile,
      showDate,
      showProgress,
      minTickets,
    } = data;

    if (!isUpdating) {
      if (!canCreateBingo) {
        toast.error(bingoLimitMessage || 'No puedes crear más bingos con tu plan actual');
        return;
      }

      const boardValidation = canCreateBoards(Number(totalTickets));
      if (!boardValidation) {
        const boardMessage = boardLimitMessage(Number(totalTickets));
        toast.error(boardMessage || 'No puedes crear esa cantidad de boards con tu plan actual');
        return;
      }
    }

    try {
      let finalBannerUrl = data.banner || DEFAULT_BANNER;

      if (bannerFile) {
        setIsUploadingImage(true);
        try {
          finalBannerUrl = await imageUpload(bannerFile, {
            folder: 'raffles',
          });
        } catch {
          finalBannerUrl = DEFAULT_BANNER;
        } finally {
          setIsUploadingImage(false);
        }
      }

      const raffleInput = {
        title: title,
        price: Number(price),
        award: Number(award),
        totalTickets: Number(totalTickets),
        drawDate: new Date(drawDate).toISOString(),
        status,
        description,
        banner: finalBannerUrl,
        showDate: showDate ?? true,
        showProgress: showProgress ?? true,
        minTickets: minTickets ? Number(minTickets) : 2,
      };

      if (isUpdating && raffleData?.id) {
        await updateRaffle(raffleData.id, raffleInput);
        toast.success('Rifa actualizada exitosamente!!');
      } else {
        await createRaffle(raffleInput);
        toast.success('Rifa creada exitosamente!!');
      }

      router.push(ROUTES.RAFFLES.LIST);
    } catch (error: unknown) {
      const errorMessage = extractErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  const handleCancel = () => {
    reset();
    handleBack();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 flex-col flex gap-6 h-full">
          <PageHeader
            title={isUpdating ? 'Editar Rifa' : 'Crear Rifa'}
            subtitle="Gestión de Rifas"
            showBackButton
          />
          <div className="flex flex-col gap-6 w-full">
            <FormInformation isUpdating={isUpdating} />

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
                disabled={
                  !isValid || isSubmitting || isCreating || isUploadingImage
                }
              >
                {isSubmitting || isCreating
                  ? 'Guardando...'
                  : isUploadingImage
                    ? 'Subiendo imagen...'
                    : 'Guardar'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default RafflesForm;
