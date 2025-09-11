import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext<{ req: { user?: { role?: Role } } }>();
    const user = gqlContext.req.user;

    if (!user) {
      throw new ForbiddenException('No estás autenticado.');
    }

    const hasRequiredRoles = requiredRoles.includes(user.role);

    if (!hasRequiredRoles) {
      throw new ForbiddenException(
        `No tienes permiso. Se requieren roles: ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}
