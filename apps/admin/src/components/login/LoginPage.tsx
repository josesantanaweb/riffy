'use client';
import LoginForm from './login-form';
import LoginPreview from './login-preview';

const LoginPage = () => {
  return (
    <div className="p-6 flex items-center justify-center h-full">
      <LoginPreview />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
