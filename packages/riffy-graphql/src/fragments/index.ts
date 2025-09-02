import { gql } from '@apollo/client';

export const USERS_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    name
    email
    whatsapp
    instagram
    tiktok
    logo
    brandColor
    status
    role
    createdAt
    updatedAt
  }
`;

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
      ...UserFragment
    }
  }
  ${USERS_FRAGMENT}
`;

export const PURCHASE_FRAGMENT = gql`
  fragment PurchaseFragment on Purchase {
    id
    buyerName
    phone
    state
    purchaseDate
    proofUrl
    status
  }
`;

export const TICKETS_FRAGMENT = gql`
  fragment TicketFragment on Ticket {
    id
    number
    status
    purchase {
      ...PurchaseFragment
    }
  }
  ${PURCHASE_FRAGMENT}
`;
