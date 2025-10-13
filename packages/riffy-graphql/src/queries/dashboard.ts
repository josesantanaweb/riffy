import { gql } from '@apollo/client';
import { DASHBOARD_STATS_FRAGMENT } from '../fragments';

export const GET_DASHBOARD_STATS = gql`
  query DashboardStats {
    dashboardStats {
      ...DashboardStatsFragment
    }
  }
  ${DASHBOARD_STATS_FRAGMENT}
`;
