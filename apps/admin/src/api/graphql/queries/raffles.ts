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
  }
`;
