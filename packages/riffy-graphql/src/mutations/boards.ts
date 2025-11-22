import { gql } from '@apollo/client';
import { BOARD_FRAGMENT } from '../fragments';

export const UPDATE_BOARD_STATUS = gql`
  mutation UpdateBoardStatus($id: String!, $status: BoardStatus!) {
    updateBoardStatus(id: $id, status: $status) {
      ...BoardFragment
    }
  }
  ${BOARD_FRAGMENT}
`;
