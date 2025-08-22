'use client';
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support';
import type { ReactNode } from 'react';

import { makeClient } from '@/api/client';

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
};

export default Providers;
