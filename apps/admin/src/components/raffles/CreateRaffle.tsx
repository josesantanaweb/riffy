'use client';
import toast from 'react-hot-toast';
import { Breadcrumb, Button, Icon } from '@riffy/components';
import { useRouter } from 'next/navigation';
import { useCreateRaffle } from '@riffy/hooks';
import FormInformation from './form/FormInformation';
import FormImages from './form/FormImages';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createRaffleSchema,
  type CreateRaffleFormData,
} from '@/validations/raffleSchema';
import Toast from '@/components/common/toast';
import { ROUTES } from '@/constants';

const CreateRaffle = () => {
  const methods = useForm<CreateRaffleFormData>({
    resolver: zodResolver(createRaffleSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      drawDate: '',
      price: '',
      award: '',
      totalTickets: '',
      status: 'ACTIVE',
      description: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = methods;

  const router = useRouter();
  const ownerId = 'cmeyplmjp00026naspzph6qh0';
  const banner = '/images/banner.png';
  const { createRaffle, loading: isLoading } = useCreateRaffle();

  const handleBack = () => router.back();

  const onSubmit = async (data: CreateRaffleFormData) => {
    const { title, status, description, price, award, totalTickets, drawDate } =
      data;
    try {
      const raffleInput = {
        title,
        status,
        description,
        price: Number(price),
        award: Number(award),
        totalTickets: Number(totalTickets),
        drawDate: new Date(drawDate).toISOString(),
        ownerId,
        banner,
      };

      await createRaffle(raffleInput);
      toast.custom(t => (
        <Toast
          t={t}
          type="success"
          message="Rifa creada exitosamente!!"
        />
      ));
      router.push(ROUTES.RAFFLES.LIST);
    } catch (error) {
      console.error('Error creando rifa:', error);
      toast.custom(t => (
        <Toast
          t={t}
          type="error"
          message="Error creando rifa."
        />
      ));
    }
  };

  const handleCancel = () => {
    reset();
    router.back();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 flex-col flex gap-6">
          <div className="flex w-full justify-between items-center">
            <div className="flex flex-col">
              <h3 className="text-white text-lg font-semibold">Rifas</h3>
              <Breadcrumb page="Crear Rifa" />
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
                disabled={!isValid || isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? 'Guardando...' : 'Guardar'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateRaffle;
