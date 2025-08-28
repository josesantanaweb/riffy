import { gql } from '@apollo/client';

export const GET_RAFFLES = gql`
  query Raffles {
    raffles {
      id
      title
      description
      primaryColor
      secondaryColor
      totalTickets
      price
      drawDate
      createdAt
      updatedAt
      sold
      available
      progress
      tickets {
        id
        number
        status
      }
    }
  }
`;
