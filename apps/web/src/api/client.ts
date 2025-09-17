import { HttpLink } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';
import { createAuthLink } from '@/lib/apollo-auth-link';

export function makeClient(): ApolloClient<InMemoryCache> {
  const getGraphQLUri = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    return `${apiUrl}/graphql`;
  };

  const httpLink = new HttpLink({
    uri: getGraphQLUri(),
    fetchOptions: { cache: 'no-store' },
  });

  const { authLink, errorLink } = createAuthLink();

  const link = errorLink.concat(authLink.concat(httpLink));

  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
}
