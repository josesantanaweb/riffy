import { gql } from '@apollo/client';
import { RAFFLES_FRAGMENT, USERS_FRAGMENT } from '../fragments';

export const GET_USERS = gql`
  query Users($role: Role) {
    users(role: $role) {
      ...UserFragment
    }
  }
  ${USERS_FRAGMENT}
`;

export const GET_USER = gql`
  query User($id: String!) {
    user(id: $id) {
      ...UserFragment
    }
  }
  ${USERS_FRAGMENT}
`;

export const GET_USER_BY_DOMAIN = gql`
  query UserByDomain($domain: String!) {
    userByDomain(domain: $domain) {
      ...UserFragment
      raffles {
        ...RaffleFragment
      }
    }
  }
  ${USERS_FRAGMENT}
  ${RAFFLES_FRAGMENT}
`;

export const GET_PROFILE = gql`
  query Profile {
    profile {
      ...UserFragment
    }
  }
  ${USERS_FRAGMENT}
`;
