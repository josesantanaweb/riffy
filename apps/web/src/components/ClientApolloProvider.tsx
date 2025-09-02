'use client';
import React from 'react';
import type { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@/lib/apollo';

export default function ClientApolloProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
