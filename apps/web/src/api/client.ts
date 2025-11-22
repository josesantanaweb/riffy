import { ApolloClient, InMemoryCache } from '@apollo/experimental-nextjs-app-support';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { HttpLink, split } from '@apollo/client';
import { createAuthLink } from '@/lib/apollo-auth-link';
import { createClient as createWsClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

export function makeClient(): ApolloClient<InMemoryCache> {
  const getGraphQLUri = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    return `${apiUrl}/graphql`;
  };

  const getGraphQLWsUri = () => {
    const wsUrl =
      process.env.NEXT_PUBLIC_WS_URL ||
      getGraphQLUri().replace(/^http/, 'ws');
    return wsUrl;
  };

  const httpLink = new HttpLink({
    uri: getGraphQLUri(),
    fetchOptions: { cache: 'no-store' },
  });

  const { authLink, errorLink } = createAuthLink();

  let link = errorLink.concat(authLink.concat(httpLink));

  if (typeof window !== 'undefined') {
    const wsLink = new GraphQLWsLink(
      createWsClient({
        url: getGraphQLWsUri(),
      }),
    );

    link = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      link,
    );
  }

  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
}
