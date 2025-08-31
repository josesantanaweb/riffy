import { gql } from '@apollo/client';
import { RAFFLES_FRAGMENT } from '../fragments';

export const CREATE_RAFFLE = gql`
  mutation CreateRaffle($input: CreateRaffleInput!) {
    createRaffle(input: $input) {
      ...RaffleFragment
    }
  }
  ${RAFFLES_FRAGMENT}
`;

export const UPDATE_RAFFLE = gql`
  mutation UpdateRaffle($id: String!, $input: UpdateRaffleInput!) {
    updateRaffle(id: $id, input: $input) {
      ...RaffleFragment
    }
  }
  ${RAFFLES_FRAGMENT}
`;

export const DELETE_RAFFLE = gql`
  mutation DeleteRaffle($id: String!) {
    deleteRaffle(id: $id) {
      id
    }
  }
`;
