import { Resolver, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PlanUsageService } from './plan-usage.service';
import { PlanUsage } from './entities/plan-usage.entity';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@Resolver(() => PlanUsage)
export class PlanUsageResolver {
  constructor(private readonly planUsageService: PlanUsageService) {}

  /**
   * Resetea el uso de plan del usuario actual (útil para renovaciones).
   * @param user Usuario autenticado
   * @returns El registro de PlanUsage reseteado
   */
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => PlanUsage, { name: 'resetPlanUsage' })
  reset(@CurrentUser() user: { id: string }): Promise<PlanUsage> {
    return this.planUsageService.resetUsage(user.id);
  }
}
