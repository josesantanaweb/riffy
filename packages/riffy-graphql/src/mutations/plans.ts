
import { gql } from '@apollo/client';
import { PLAN_FRAGMENT } from '../fragments';

export const CREATE_PLAN = gql`
  mutation CreatePlan($input: CreatePlanInput!) {
    createPlan(input: $input) {
      ...PlanFragment
    }
  }
  ${PLAN_FRAGMENT}
`;

export const UPDATE_PLAN = gql`
  mutation UpdatePlan($id: String!, $input: UpdatePlanInput!) {
    updatePlan(id: $id, input: $input) {
      ...PlanFragment
    }
  }
  ${PLAN_FRAGMENT}
`;

export const DELETE_PLAN = gql`
  mutation DeletePlan($id: String!) {
    deletePlan(id: $id) {
      id
    }
  }
`;
