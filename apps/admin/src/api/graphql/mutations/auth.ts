import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      refreshToken
      user {
        username
        email
        name
        id
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      accessToken
      refreshToken
      user {
        username
        email
        name
        id
        image
      }
    }
  }
`;

export const REFRESH_TOKEN = gql`
  query RefreshToken($id: String!, $refreshToken: String!) {
    refreshToken(id: $id, refreshToken: $refreshToken) {
      user {
        id
        email
        username
        name
        image
      }
      accessToken
      refreshToken
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout($id: String!) {
    logout(id: $id)
  }
`;
