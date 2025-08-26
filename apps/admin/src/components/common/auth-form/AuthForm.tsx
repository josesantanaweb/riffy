'use client';
import React from 'react';
import { Button, Input } from '../../../../../../packages/riffy-components/src';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodSchema } from 'zod';

interface IAuthInput {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
  code?: string;
}

interface AuthFormProps {
  mode: 'login' | 'register';
  schema: ZodSchema<any>;
  onSubmit: (data: any) => Promise<void>;
  onNavigate?: () => void;
  googleIconSrc?: string;
}

const AuthForm = ({ mode, schema, onSubmit, onNavigate, googleIconSrc = '/images/auth/google.svg' }: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<IAuthInput>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const password = watch('password');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const isLogin = mode === 'login';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center h-[calc(100vh-70px)] flex-col w-full px-4 py-8">
      <div className="flex flex-col items-start mb-6 w-full gap-1">
        <h3 className="text-white uppercase text-xl font-bold">
          {isLogin ? 'Acceder' : 'Crear Cuenta'}
        </h3>
        <p className="text-base-300 text-base">
          {isLogin ? 'Accede a tu cuenta' : 'Regístrate para comenzar'}
        </p>
      </div>

      <div className="flex flex-col items-start gap-3 w-full mb-6">
        {!isLogin && (
          <Input placeholder="Usuario" {...register('name')} error={errors.name?.message} />
        )}

        <Input
          placeholder="Correo electrónico"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />

        <div className="flex items-end flex-col gap-3 w-full">
          <Input
            type={showPassword ? 'text' : 'password'}
            icon={showPassword ? 'icon-show' : 'icon-hide'}
            iconPosition="right"
            placeholder="Contraseña"
            onIconClick={() => setShowPassword(!showPassword)}
            {...register('password')}
            error={errors.password?.message}
          />

          {!isLogin && (
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              icon={showConfirmPassword ? 'icon-show' : 'icon-hide'}
              iconPosition="right"
              placeholder="Confirmar contraseña"
              onIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
          )}

          {!isLogin && (
            <Input
              type="text"
              placeholder="Código promocional  (Opcional)"
              {...register('code')}
              error={errors.code?.message}
            />
          )}

          {isLogin && (
            <span className="text-primary-600 text-base font-medium">
              ¿Olvidaste tu Contraseña?
            </span>
          )}
        </div>
      </div>

      <Button variant="primary" isFull type="submit" disabled={!isValid}>
        {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
      </Button>

      <div className="my-6 flex items-center gap-4 w-full">
        <div className="flex-1 h-px bg-base-600"></div>
        <span className="text-base-300 text-base capitalize px-2">o</span>
        <div className="flex-1 h-px bg-base-600"></div>
      </div>

      <Button variant="default" isFull>
        <Image src={googleIconSrc} alt="google" width={20} height={20} className="w-5 h-5" />
        Continúa con Google
      </Button>

      <div className="flex items-center gap-2 mt-6">
        <span className="text-base-300 text-base">
          {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes cuenta?'}
        </span>
        <button
          type="button"
          aria-label={isLogin ? 'Regístrate' : 'Inicia Sesión'}
          className="text-primary-600 text-base font-medium cursor-pointer hover:text-primary-500 transition-colors"
          onClick={onNavigate}
        >
          {isLogin ? 'Regístrate' : 'Inicia Sesión'}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
