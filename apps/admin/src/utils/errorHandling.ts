interface GraphQLError {
  message: string;
  locations?: Array<{ line: number; column: number }>;
  path?: Array<string | number>;
  extensions?: {
    code?: string;
    stacktrace?: string[];
    originalError?: unknown;
  };
}

interface ApolloError {
  graphQLErrors?: GraphQLError[];
  networkError?: Error;
  message: string;
}

export const extractErrorMessage = (error: unknown): string => {
  if (error && typeof error === 'object' && 'graphQLErrors' in error) {
    const apolloError = error as ApolloError;
    const graphQLError = apolloError.graphQLErrors?.[0];
    if (graphQLError?.message) {
      return graphQLError.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (error && typeof error === 'object' && 'message' in error) {
    const errorWithMessage = error as { message: string };
    return errorWithMessage.message;
  }

  return 'Ha ocurrido un error inesperado';
};
