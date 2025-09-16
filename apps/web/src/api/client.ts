import { HttpLink } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';
import { createAuthLink } from '@/lib/apollo-auth-link';

export function makeClient(): ApolloClient<InMemoryCache> {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    fetchOptions: { cache: 'no-store' },
  });

  const { authLink, errorLink } = createAuthLink();

  const link = errorLink.concat(authLink.concat(httpLink));

  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
}
