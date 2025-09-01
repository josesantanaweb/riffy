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
      logo
      email
      phone
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

export const USERS_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    name
    email
    phone
    logo
    brandColor
    status
    role
    createdAt
    updatedAt
  }
`;
