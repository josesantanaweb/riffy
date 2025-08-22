import { gql } from '@apollo/client';

export const GET_PROFILE = gql`
  query Profile {
    profile {
      id
      name
      username
      raking
      balance
      email
      image
      refreshToken
      role
      createdAt
      updatedAt
    }
  }
`;
