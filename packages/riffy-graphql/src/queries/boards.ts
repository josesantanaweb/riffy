import { gql } from '@apollo/client';
import { BOARD_FRAGMENT } from '../fragments';

export const GET_BOARDS_BY_BINGO = gql`
  query BoardsByBingo($bingoId: String!) {
    boardsByBingo(bingoId: $bingoId) {
      ...BoardFragment
    }
  }
  ${BOARD_FRAGMENT}
`;

export const GET_BOARDS_BY_NATIONAL_ID = gql`
  query BoardsByNationalId($bingoId: String!, $nationalId: String!) {
    boardsByNationalId(bingoId: $bingoId, nationalId: $nationalId) {
      ...BoardFragment
    }
  }
  ${BOARD_FRAGMENT}
`;
