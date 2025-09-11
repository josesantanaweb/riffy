import { gql } from '@apollo/client';
import { USERS_FRAGMENT } from '../fragments';

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      user {
        ...UserFragment
      }
    }
  }
  ${USERS_FRAGMENT}
`;
