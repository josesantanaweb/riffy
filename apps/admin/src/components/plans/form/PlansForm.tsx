'use client';
import React, { useEffect, useCallback } from 'react';
import { Button } from '@riffy/components';
import { useRouter, useParams } from 'next/navigation';
import {
  useCreatePlan,
  usePlan,
  useUpdatePlan,
} from '@riffy/hooks';
import { useToast } from '@/hooks';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPlanSchema, type FormData } from '@/validations/planSchema';
import { ROUTES } from '@/constants';
import FormInformation from './form-information';
import PageHeader from '@/components/common/page-header';

const DEFAULT_VALUES: FormData = {
  name: '',
  description: [],
  price: '',
  maxBingos: '',
  maxBoards: '',
  type: 'BASIC' as FormData['type'],
};

const PlansForm = () => {
  const methods = useForm<FormData>({
    resolver: zodResolver(createPlanSchema),
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
  const planId = useParams().planId as string | undefined;
  const { data: planData } = usePlan(planId);
  const { createPlan, loading: isCreating } = useCreatePlan();
  const { updatePlan } = useUpdatePlan();

  const isUpdating = Boolean(planData);

  useEffect(() => {
    if (!planData) return;
    reset({
      name: planData.name || '',
      description: planData.description || [],
      price: String(planData.price ?? ''),
      maxBingos: String(planData.maxBingos ?? ''),
      maxBoards: String(planData.maxBoards ?? ''),
      type: planData.type || '',
    });
  }, [planData, reset]);

  const handleBack = useCallback(() => router.back(), [router]);

  const onSubmit = async (data: FormData) => {
    const {
      name,
      description,
      price,
      maxBingos,
      maxBoards,
      type,
    } = data;

    try {
      const planInput = {
        name: name,
        description: description,
        price: Number(price),
        maxBingos: Number(maxBingos),
        maxBoards: Number(maxBoards),
        type: type,
      };

      if (isUpdating && planData?.id) {
        await updatePlan(planData.id, planInput);
        toast.success('Plan actualizado exitosamente!!');
      } else {
        await createPlan(planInput);
        toast.success('Plan creado exitosamente!!');
      }

      router.push(ROUTES.PLANS.LIST);
    } catch {
      toast.error('Error guardando plan');
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
            title={isUpdating ? 'Editar Plan' : 'Crear Plan'}
            subtitle="Gestión de Planes"
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

export default PlansForm;
