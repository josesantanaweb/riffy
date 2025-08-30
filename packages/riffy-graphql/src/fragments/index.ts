import { gql } from '@apollo/client';

export const RAFFLES_FRAGMENT = gql`
  fragment RaffleFragment on Raffle {
    id
    title
    description
    primaryColor
    secondaryColor
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
      email
      phone
      state
      role
    }
  }
`;
