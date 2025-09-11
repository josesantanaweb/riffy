import { onError } from '@apollo/client/link/error';
import { ApolloLink } from '@apollo/client';

export const createAuthLink = () => {
  const authLink = new ApolloLink((operation, forward) => {
    return forward(operation);
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      //
    }

    if (networkError) {
      //
    }
  });

  return { authLink, errorLink };
};
