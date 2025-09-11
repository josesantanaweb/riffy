import { gql } from '@apollo/client';
import { RAFFLES_FRAGMENT } from '../fragments';

export const GET_RAFFLES = gql`
  query Raffles {
    raffles {
      ...RaffleFragment
    }
  }
  ${RAFFLES_FRAGMENT}
`;

export const GET_RAFFLES_BY_DOMAIN = gql`
  query RafflesByDomain {
    rafflesByDomain {
      ...RaffleFragment
    }
  }
  ${RAFFLES_FRAGMENT}
`;

export const GET_RAFFLE = gql`
  query Raffle($id: String!) {
    raffle(id: $id) {
      ...RaffleFragment
    }
  }
  ${RAFFLES_FRAGMENT}
`;
