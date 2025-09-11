export interface RequestWithHeaders {
  headers?: {
    host?: string;
  };
}

export interface GraphQLRequest extends RequestWithHeaders {
  domain: string;
}

export function extractDomainFromRequest(req: RequestWithHeaders): string {
  const host = req.headers?.host || '';

  if (process.env.NODE_ENV === 'development') {
    return process.env.DEFAULT_DOMAIN || 'localhost:3000';
  }

  return host ? host.split(':')[0] : 'localhost';
}

export function createGraphQLContext({ req }: { req: RequestWithHeaders }): {
  req: GraphQLRequest;
} {
  const domain = extractDomainFromRequest(req);

  return {
    req: {
      ...req,
      domain,
    } as GraphQLRequest,
  };
}
