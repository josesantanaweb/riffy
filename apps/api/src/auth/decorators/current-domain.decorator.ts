import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLRequest } from '../../common/utils/domain.utils';

interface GraphQLContext {
  req: GraphQLRequest;
}

export const CurrentDomain = createParamDecorator(
  (data: unknown, context: ExecutionContext): string => {
    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext<GraphQLContext>();
    return gqlContext.req.domain;
  },
);
