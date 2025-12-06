'use client';
import React, { useEffect, useCallback, useState } from 'react';
import { Button } from '@riffy/components';
import { useRouter, useParams } from 'next/navigation';
import { useUpdateUser, useUser, useCreateUser, useProfile } from '@riffy/hooks';
import { CreateUserInput, Role, UserStatus } from '@riffy/types';
import { useToast } from '@/hooks';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ownerSchema, type FormData } from '@/validations/ownerSchema';
import { imageUpload } from '@riffy/utils';
import { ROUTES } from '@/constants';
import FormInformation from './form-information';
import FormImages from './form-image';
import PageHeader from '@/components/common/page-header';

const DEFAULT_VALUES: FormData = {
  name: '',
  email: '',
  password: '',
  brandColor: '',
  domain: '',
  whatsapp: '',
  instagram: '',
  tiktok: '',
  logo: '',
  logoFile: null,
  status: UserStatus.ACTIVE,
  planId: '',
};

interface OwnersFormProps {
  isProfileMode?: boolean;
}

const OwnersForm = ({ isProfileMode = false }: OwnersFormProps) => {
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(ownerSchema),
    mode: 'onChange',
    defaultValues: DEFAULT_VALUES,
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
    reset,
    watch,
  } = methods;

  const router = useRouter();
  const toast = useToast();
  const paramsOwnerId = useParams().ownerId as string | undefined;
  const { data: profileData, loading: profileLoading } = useProfile();

  const ownerId = isProfileMode ? profileData?.id : paramsOwnerId;
  const { data: ownerData, loading: ownerLoading } = useUser(ownerId);

  const finalOwnerData = isProfileMode ? profileData : ownerData;

  const { createUser, loading: isCreating } = useCreateUser();
  const { updateUser } = useUpdateUser();

  const isUpdating = Boolean(finalOwnerData);

  useEffect(() => {
    if (!finalOwnerData) return;

    reset({
      name: finalOwnerData.name ?? '',
      email: finalOwnerData.email ?? '',
      password: '',
      domain: finalOwnerData.domain ?? '',
      brandColor: finalOwnerData.brandColor ?? '',
      whatsapp: finalOwnerData.whatsapp ?? '',
      instagram: finalOwnerData.instagram ?? '',
      tiktok: finalOwnerData.tiktok ?? '',
      logo: finalOwnerData.logo ?? '',
      logoFile: null,
      status: finalOwnerData.status ?? UserStatus.ACTIVE,
      planId: finalOwnerData?.plan?.id ?? '',
    });
  }, [finalOwnerData, reset]);

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
          finalLogoUrl = await imageUpload(logoFile, { folder: 'owners' });
        } catch {
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
        domain: rest.domain,
        instagram: rest.instagram,
        tiktok: rest.tiktok,
        logo: finalLogoUrl,
        role: Role.OWNER,
        status: rest.status,
        planId: rest.planId,
      };

      if (isUpdating && finalOwnerData?.id) {
        const updateData = rest.password
          ? ownerInput
          : { ...ownerInput, password: undefined };

        await updateUser(finalOwnerData.id, updateData);
        toast.success(
          isProfileMode
            ? 'Perfil actualizado exitosamente!!'
            : 'Dueño actualizado exitosamente!!'
        );
      } else {
        await createUser(ownerInput);
        toast.success('Dueño creado exitosamente!!');
      }

      if (!isProfileMode) {
        router.push(ROUTES.OWNERS.LIST);
      }
    } catch {
      toast.error('Error guardando dueño');
    }
  };

  const handleCancel = () => {
    reset();
    if (!isProfileMode) {
      handleBack();
    }
  };

  if (isProfileMode && (profileLoading || ownerLoading)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 flex-col flex gap-6">
          <PageHeader
            title={
              isProfileMode
                ? 'Mi Perfil'
                : isUpdating
                ? 'Editar Dueño'
                : 'Crear Dueño'
            }
            subtitle={
              isProfileMode
                ? 'Editar información personal'
                : 'Gestión de Dueños'
            }
            showBackButton={!isProfileMode}
          />
          <div className="flex flex-col gap-6 w-full">
            <FormInformation isProfileMode={isProfileMode} />

            <FormImages />

            <div className="flex items-center justify-end gap-3">
              {!isProfileMode && (
                <Button
                  variant="default"
                  size="md"
                  onClick={handleCancel}
                  type="button"
                >
                  Cancelar
                </Button>
              )}
              <Button
                variant="primary"
                size="md"
                type="submit"
                disabled={!isValid || isSubmitting || isCreating || isUploadingImage || (!isUpdating && !watch('password'))}
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
