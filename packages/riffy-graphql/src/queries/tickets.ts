import { gql } from '@apollo/client';
import { TICKETS_FRAGMENT } from '../fragments';

export const GET_TICKETS_BY_RAFFLE_ID = gql`
  query TicketsByRaffleId($raffleId: String!) {
    ticketsByRaffleId(raffleId: $raffleId) {
      ...TicketFragment
    }
  }
  ${TICKETS_FRAGMENT}
`;
