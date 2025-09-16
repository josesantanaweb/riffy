import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

interface GraphQLContext {
  req: {
    user: User;
  };
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext<GraphQLContext>();
    return gqlContext.req.user;
  },
);
