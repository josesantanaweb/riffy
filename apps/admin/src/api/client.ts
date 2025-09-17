import { HttpLink, split } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { tokenStorage } from '@/utils/tokenStorage';
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

  const getWebSocketUri = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_WS_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    return `${apiUrl.replace('http', 'ws')}/graphql`;
  };

  const wsLink =
    typeof window !== 'undefined'
      ? new GraphQLWsLink(
          createClient({
            url: getWebSocketUri(),
            connectionParams: async () => {
              const token = tokenStorage.getAccessToken();
              return {
                authorization: token ? `Bearer ${token}` : '',
              };
            },
          }),
        )
      : null;

  const splitLink =
    typeof window !== 'undefined' && wsLink
      ? split(
          ({ query }) => {
            const def = getMainDefinition(query);
            return (
              def.kind === 'OperationDefinition' &&
              def.operation === 'subscription'
            );
          },
          wsLink,
          errorLink.concat(authLink.concat(httpLink)),
        )
      : errorLink.concat(authLink.concat(httpLink));

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
  });
}
