'use client';
import React, { useEffect, useCallback, useState } from 'react';
import { Button } from '@riffy/components';
import { useRouter, useParams } from 'next/navigation';
import { useCreateBingo, useBingo, useUpdateBingo, usePlanUsage } from '@riffy/hooks';
import { useToast } from '@/hooks';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createBingoSchema, type FormData } from '@/validations/bingoSchema';
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
  totalBoards: '',
  status: 'ACTIVE',
  description: '',
  banner: '',
  bannerFile: null,
  showDate: true,
  showProgress: true,
  minBoards: '2',
};

const DEFAULT_BANNER = '/images/banner.png';

const BingosForm = () => {
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(createBingoSchema),
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
  const bingoId = useParams().bingoId as string | undefined;
  const { data: bingoData } = useBingo(bingoId);
  const { createBingo, loading: isCreating } = useCreateBingo();
  const { updateBingo } = useUpdateBingo();
  const { canCreateBingo, canCreateBoards, bingoLimitMessage, boardLimitMessage } = usePlanUsage();

  const isUpdating = Boolean(bingoData);

  useEffect(() => {
    if (!bingoData) return;
    reset({
      title: bingoData.title || '',
      drawDate: bingoData.drawDate
        ? new Date(bingoData.drawDate)
        : new Date(),
      price: String(bingoData.price ?? ''),
      award: String(bingoData.award ?? ''),
      totalBoards: String(bingoData.totalBoards ?? ''),
      status: bingoData.status || 'ACTIVE',
      description: bingoData.description || '',
      banner: bingoData.banner || '',
      bannerFile: null,
      showDate: bingoData.showDate ?? true,
      showProgress: bingoData.showProgress ?? true,
      minBoards: String(bingoData.minBoards ?? 2),
    });
  }, [bingoData, reset]);

  const handleBack = useCallback(() => router.back(), [router]);

  const onSubmit = async (data: FormData) => {
    const {
      title,
      status,
      description,
      price,
      award,
      totalBoards,
      drawDate,
      bannerFile,
      showDate,
      showProgress,
      minBoards,
    } = data;

    if (!isUpdating) {
      if (!canCreateBingo) {
        toast.error(bingoLimitMessage || 'No puedes crear más bingos con tu plan actual');
        return;
      }

      const boardValidation = canCreateBoards(Number(totalBoards));
      if (!boardValidation) {
        const boardMessage = boardLimitMessage(Number(totalBoards));
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
            folder: 'bingos',
          });
        } catch {
          finalBannerUrl = DEFAULT_BANNER;
        } finally {
          setIsUploadingImage(false);
        }
      }

      const bingoInput = {
        title: title,
        price: Number(price),
        award: Number(award),
        totalBoards: Number(totalBoards),
        drawDate: new Date(drawDate).toISOString(),
        status,
        description,
        banner: finalBannerUrl,
        showDate: showDate ?? true,
        showProgress: showProgress ?? true,
        minBoards: minBoards ? Number(minBoards) : 2,
      };

      if (isUpdating && bingoData?.id) {
        await updateBingo(bingoData.id, bingoInput);
        toast.success('Rifa actualizada exitosamente!!');
      } else {
        await createBingo(bingoInput);
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

export default BingosForm;
