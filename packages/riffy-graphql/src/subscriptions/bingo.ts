import { gql } from '@apollo/client';

export const ANNOUNCE_NUMBER_SUBSCRIPTION = gql`
  subscription AnnounceNumber($bingoId: String!) {
    announceNumber(bingoId: $bingoId)
  }
`;

