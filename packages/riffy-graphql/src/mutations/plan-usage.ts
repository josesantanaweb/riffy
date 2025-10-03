import { gql } from '@apollo/client';
import { PLAN_USAGE_FRAGMENT } from '../fragments';

export const RESET_PLAN_USAGE = gql`
  mutation ResetPlanUsage {
    resetPlanUsage {
      ...PlanUsageFragment
    }
  }
  ${PLAN_USAGE_FRAGMENT}
`;
