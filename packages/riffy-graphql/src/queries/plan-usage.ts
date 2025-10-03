import { gql } from '@apollo/client';
import { PLAN_USAGE_FRAGMENT } from '../fragments';

export const GET_MY_PLAN_USAGE = gql`
  query MyPlanUsage {
    myPlanUsage {
      ...PlanUsageFragment
    }
  }
  ${PLAN_USAGE_FRAGMENT}
`;

export const GET_PLAN_USAGE = gql`
  query PlanUsage($userId: String!) {
    planUsage(userId: $userId) {
      ...PlanUsageFragment
    }
  }
  ${PLAN_USAGE_FRAGMENT}
`;
