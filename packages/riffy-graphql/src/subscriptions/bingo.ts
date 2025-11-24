import { gql } from '@apollo/client';

export const NUMBER_DRAW_SUBSCRIPTION = gql`
  subscription NumberDraw($bingoId: String!) {
    numberDraw(bingoId: $bingoId)
  }
`;

