'use client';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export function createApolloClient() {
  const raw = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const base = raw.replace(/\/$/, '');
  const API_URL = base.endsWith('/graphql') ? base : `${base}/graphql`;
  console.log('[apollo] API_URL ->', API_URL);

  return new ApolloClient({
    link: new HttpLink({ uri: API_URL, credentials: 'include' }),
    cache: new InMemoryCache(),
  });
}

export const apolloClient = createApolloClient();
