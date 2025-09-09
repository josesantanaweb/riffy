import { Suspense } from 'react';
import Login from '@/components/login';

const LoginPage = () => (
  <Suspense fallback={null}>
    <Login />
  </Suspense>
);

export default LoginPage;
