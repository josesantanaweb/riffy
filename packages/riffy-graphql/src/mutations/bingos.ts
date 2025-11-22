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

export const START_BINGO_AUTO_DRAW = gql`
  mutation StartBingoAutoDraw($bingoId: String!) {
    startBingoAutoDraw(bingoId: $bingoId)
  }
`;

export const STOP_BINGO_AUTO_DRAW = gql`
  mutation StopBingoAutoDraw($bingoId: String!) {
    stopBingoAutoDraw(bingoId: $bingoId)
  }
`;
