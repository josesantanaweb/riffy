import { gql } from '@apollo/client';

import { USER_FRAGMENT } from '../fragments';

export const UPDATE_USER = gql`
  ${USER_FRAGMENT}
  mutation UpdateUser($id: String!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      ...UserFragment
    }
  }
`;
