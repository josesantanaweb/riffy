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
