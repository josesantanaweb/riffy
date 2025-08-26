'use client';
import AuthForm from '@/components/common/auth-form';
import { registerSchema } from '@/validations/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks';

interface RegisterInput {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
  code?: string;
}

const Register = () => {
  const router = useRouter();
  const { register } = useAuth();

  const handleRegister = async (data: RegisterInput) => {
    const { email, password, name, code } = data;

    await register({
      username: email,
      password,
      name: name || '',
      email,
      code,
    });

    router.push('/coinflip');
  };

  const handleNavigate = () => {
    router.push('/login');
  };

  return (
    <AuthForm
      mode="register"
      schema={registerSchema}
      onSubmit={handleRegister}
      onNavigate={handleNavigate}
    />
  );
};

export default Register;
