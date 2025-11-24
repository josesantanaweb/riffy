import { gql } from '@apollo/client';
import { BINGOS_FRAGMENT } from '../fragments';

export const CREATE_BINGO = gql`
  mutation CreateBingo($input: CreateBingoInput!) {
    createBingo(input: $input) {
      ...BingoFragment
    }
  }
  ${BINGOS_FRAGMENT}
`;

export const UPDATE_BINGO = gql`
  mutation UpdateBingo($id: String!, $input: UpdateBingoInput!) {
    updateBingo(id: $id, input: $input) {
      ...BingoFragment
    }
  }
  ${BINGOS_FRAGMENT}
`;

export const DELETE_BINGO = gql`
  mutation DeleteBingo($id: String!) {
    deleteBingo(id: $id) {
      id
    }
  }
`;

export const START_AUTO_NUMBER_DRAW = gql`
  mutation StartAutoNumberDraw($bingoId: String!) {
    startAutoNumberDraw(bingoId: $bingoId)
  }
`;

export const STOP_AUTO_NUMBER_DRAW = gql`
  mutation StopAutoNumberDraw($bingoId: String!) {
    stopAutoNumberDraw(bingoId: $bingoId)
  }
`;
