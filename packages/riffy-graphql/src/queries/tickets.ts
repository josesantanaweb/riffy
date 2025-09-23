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

export const GET_TICKETS_BY_NATIONAL_ID = gql`
  query TicketsByNationalId($raffleId: String!, $nationalId: String!) {
    ticketsByNationalId(raffleId: $raffleId, nationalId: $nationalId) {
      ...TicketFragment
    }
    raffle(id: $raffleId) {
      id
      title
      award
      banner
    }
  }
  ${TICKETS_FRAGMENT}
`;
