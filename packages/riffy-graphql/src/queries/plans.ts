import { gql } from '@apollo/client';
import { PLAN_FRAGMENT } from '../fragments';

export const GET_PLANS = gql`
  query Plans {
    plans {
      ...PlanFragment
    }
  }
  ${PLAN_FRAGMENT}
`;

export const GET_PLAN = gql`
  query Plan($id: String!) {
    plan(id: $id) {
      ...PlanFragment
    }
  }
  ${PLAN_FRAGMENT}
`;
