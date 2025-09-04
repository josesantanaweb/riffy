import { gql } from '@apollo/client';
import { TICKETS_FRAGMENT } from '../fragments';

export const GET_TICKETS_BY_RAFFLE = gql`
  query TicketsByRaffle($raffleId: String!) {
    ticketsByRaffle(raffleId: $raffleId) {
      ...TicketFragment
    }
  }
  ${TICKETS_FRAGMENT}
`;
