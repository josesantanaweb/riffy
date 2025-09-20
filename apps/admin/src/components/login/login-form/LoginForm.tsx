'use client';
import { useState } from 'react';
import { ASSETS } from '@/constants';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type FormData } from '@/validations/auth';
import { Input, Button, Logo } from '@riffy/components';
import { useToast } from '@/hooks/useToast';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@riffy/hooks';

const LoginForm = () => {
  const methods = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    watch,
  } = methods;

  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const redirectUrl = searchParams.get('redirect') || '/';

  const email = watch('email');
  const password = watch('password');


  const onSubmit = async (data: FormData) => {
    const { email, password } = data;

    try {
      await login({ email, password });
      toast.success('Inicio de sesión exitoso');
      router.push(redirectUrl);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Error al iniciar sesión');
    }
  };

  return (
    <div className="p-6 w-full lg:w-[40%] h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:w-[80%] justify-center flex-col flex items-start gap-6"
      >
        <div className="flex flex-col gap-6">
          <Logo className="w-[64px]" src={ASSETS.IMAGES.LOGO} />
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-medium text-white">
              Inicio de sesión
            </h1>
            <p className="text-base-300 text-base">
              Accede al panel de Riffy usando tu correo electrónico y
              contraseña.
            </p>
          </div>
        </div>

        <div className="w-full">
          <Input
            label="Correo electrónico"
            placeholder="Ej: juan@correo.com"
            inputSize="lg"
            value={email}
            {...register('email')}
            error={errors.email?.message}
          />
        </div>

        <div className="w-full">
          <Input
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            icon={showPassword ? 'show' : 'hide'}
            iconPosition="right"
            placeholder="Ingresa tu contraseña"
            inputSize="lg"
            onIconClick={() => setShowPassword(!showPassword)}
            value={password}
            {...register('password')}
            error={errors.password?.message}
          />
        </div>

        <div className="w-full mt-5">
          <Button
            variant="primary"
            size="lg"
            type="submit"
            isFull
            disabled={!isValid}
          >
            Iniciar sesión
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
