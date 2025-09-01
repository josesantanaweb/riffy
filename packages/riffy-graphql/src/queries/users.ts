import { gql } from '@apollo/client';
import { USERS_FRAGMENT } from '../fragments';

export const GET_USERS = gql`
  query Users($role: Role) {
    users(role: $role) {
      ...UserFragment
    }
  }
  ${USERS_FRAGMENT}
`;
