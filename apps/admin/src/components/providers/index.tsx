'use client';
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support';
import type { ReactNode } from 'react';
import ToastProvider from "@/providers/ToastProvider";

import { makeClient } from '@/api/client';

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      <ToastProvider />
      {children}
    </ApolloNextAppProvider>
  );
};

export default Providers;
