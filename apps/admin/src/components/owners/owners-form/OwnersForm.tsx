'use client';
import React, { useEffect, useCallback, useState } from 'react';
import { Button } from '@riffy/components';
import { useRouter, useParams } from 'next/navigation';
import { useUpdateUser, useUser, useCreateUser } from '@riffy/hooks';
import { CreateUserInput, Role, UserStatus } from '@riffy/types';
import { useToast } from '@/hooks';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ownerSchema, type FormData } from '@/validations/ownerSchema';
import { uploadImageToS3 } from '@/utils/imageUpload';
import { ROUTES } from '@/constants';
import FormInformation from './form-information';
import FormImages from './form-image';
import PageHeader from '@/components/common/page-header';

const DEFAULT_VALUES: FormData = {
  name: '',
  email: '',
  password: '',
  brandColor: '',
  whatsapp: '',
  instagram: '',
  tiktok: '',
  logo: '',
  logoFile: null,
  status: UserStatus.ACTIVE,
};

const OwnersForm = () => {
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(ownerSchema),
    mode: 'onTouched',
    defaultValues: DEFAULT_VALUES,
  });

  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
    watch,
  } = methods;

  const router = useRouter();
  const toast = useToast();
  const ownerId = useParams().ownerId as string | undefined;
  const { data: ownerData } = useUser(ownerId);
  const { createUser, loading: isCreating } = useCreateUser();
  const { updateUser } = useUpdateUser();

  const isUpdating = Boolean(ownerData);

  useEffect(() => {
    if (!ownerData) return;
    reset({
      name: ownerData.name ?? '',
      email: ownerData.email ?? '',
      password: '',
      brandColor: ownerData.brandColor ?? '',
      whatsapp: ownerData.whatsapp ?? '',
      instagram: ownerData.instagram ?? '',
      tiktok: ownerData.tiktok ?? '',
      logo: ownerData.logo ?? '',
      logoFile: null,
      status: ownerData.status ?? UserStatus.ACTIVE,
    });
  }, [ownerData, reset]);

  const handleBack = useCallback(() => router.back(), [router]);

  const onSubmit = async (data: FormData) => {
    const { logoFile, ...rest } = data;

    try {
      if (!isUpdating && !data.password) {
        toast.error('La contraseña es requerida para crear un dueño');
        return;
      }

      let finalLogoUrl = data.logo || '';

      if (logoFile) {
        setIsUploadingImage(true);
        try {
          finalLogoUrl = await uploadImageToS3(logoFile, { folder: 'owners' });
        } catch (uploadError) {
          console.error('Error subiendo logo:', uploadError);
          toast.error('Error subiendo el logo');
          setIsUploadingImage(false);
          return;
        } finally {
          setIsUploadingImage(false);
        }
      }

      const ownerInput: CreateUserInput = {
        name: rest.name,
        email: rest.email,
        password: rest.password || '',
        brandColor: rest.brandColor,
        whatsapp: rest.whatsapp,
        instagram: rest.instagram,
        tiktok: rest.tiktok,
        logo: finalLogoUrl,
        role: Role.OWNER,
        status: rest.status,
      };

      if (isUpdating && ownerData?.id) {
        const updateData = rest.password
          ? ownerInput
          : { ...ownerInput, password: undefined };

        await updateUser(ownerData.id, updateData);
        toast.success('Dueño actualizado exitosamente!!');
      } else {
        await createUser(ownerInput);
        toast.success('Dueño creado exitosamente!!');
      }

      router.push(ROUTES.OWNERS.LIST);
    } catch (error) {
      console.error('Error guardando dueño:', error);
      toast.error('Error guardando dueño');
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
          <PageHeader
            title={
              isUpdating ? 'Editar Dueño de Rifa' : 'Crear Dueño de Rifa'
            }
            subtitle="Gestión de Dueños de Rifa"
            showBackButton
          />
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
                disabled={!isValid || isSubmitting || isCreating || isUploadingImage}
              >
                {isUploadingImage
                  ? 'Subiendo imagen...'
                  : isSubmitting || isCreating
                  ? 'Guardando...'
                  : 'Guardar'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default OwnersForm;
