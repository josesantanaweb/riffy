import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DashboardService } from './dashboard.service';
import { DashboardStats } from './entities/dashboard-stats.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver()
export class DashboardResolver {
  constructor(private readonly dashboardService: DashboardService) {}

  /**
   * Obtiene las estadísticas del dashboard del usuario logueado.
   * @param user Usuario logueado
   * @returns Estadísticas del dashboard
   */
  @UseGuards(GqlAuthGuard)
  @Query(() => DashboardStats, { name: 'dashboardStats' })
  getStats(@CurrentUser() user: { id: string }): Promise<DashboardStats> {
    return this.dashboardService.getStats(user.id);
  }
}
