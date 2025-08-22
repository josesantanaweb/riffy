import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';
import { Roles } from '../enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;

    if (!user) {
      throw new ForbiddenException('No estás autenticado.');
    }

    const hasRequiredRoles = requiredRoles.some(role => user.role === role);

    if (!hasRequiredRoles) {
      throw new ForbiddenException(
        `No tienes permiso para acceder a este recurso. Se requieren los roles: ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}
