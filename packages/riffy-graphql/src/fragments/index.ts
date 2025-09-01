import { gql } from '@apollo/client';

export const RAFFLES_FRAGMENT = gql`
  fragment RaffleFragment on Raffle {
    id
    title
    description
    totalTickets
    price
    award
    banner
    drawDate
    createdAt
    updatedAt
    sold
    available
    status
    progress
    tickets {
      id
      number
      status
    }
    owner {
      id
      name
      brandColor
      image
      email
      phone
      state
      role
    }
  }
`;

export const TICKETS_FRAGMENT = gql`
  fragment TicketFragment on Ticket {
    id
    number
    status
  }
`;
