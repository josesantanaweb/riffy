import { gql } from '@apollo/client';
import { BINGOS_FRAGMENT } from '../fragments';

export const GET_BINGOS = gql`
  query Bingos {
    bingos {
      ...BingoFragment
    }
  }
  ${BINGOS_FRAGMENT}
`;

export const GET_BINGO = gql`
  query Bingo($id: String!) {
    bingo(id: $id) {
      ...BingoFragment
    }
  }
  ${BINGOS_FRAGMENT}
`;
