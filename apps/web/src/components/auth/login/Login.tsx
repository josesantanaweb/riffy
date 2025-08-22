'use client';
import AuthForm from '@/components/common/auth-form';
import { loginSchema } from '@/validations/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks';
import { ROUTES } from '@/constants';

interface LoginInput {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (data: LoginInput) => {
    const { email, password } = data;
    await login({ email, password });
    router.push(ROUTES.MINI_GAMES.COINFLIP);
  };

  const handleNavigate = () => {
    router.push(ROUTES.REGISTER);
  };

  return (
    <AuthForm
      mode="login"
      schema={loginSchema}
      onSubmit={handleLogin}
      onNavigate={handleNavigate}
    />
  );
};

export default Login;
