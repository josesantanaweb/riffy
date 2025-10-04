import { gql } from '@apollo/client';

export const PAYMENT_METHODS_FRAGMENT = gql`
  fragment PaymentMethodsFragment on PaymentMethod {
    id
    name
    type
    bankName
    phoneNumber
    nationalId
    binanceId
    paypalEmail
    createdAt
    updatedAt
    ownerId
  }
`;

export const PLAN_FRAGMENT = gql`
  fragment PlanFragment on Plan {
    name
    id
    description
    price
    maxRaffles
    maxTickets
    type
  }
`;

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
    domain
    paymentMethods {
      ...PaymentMethodsFragment
    }
    plan {
      ...PlanFragment
    }
    planUsage {
      id
      currentRaffles
      currentTickets
      status
    }
  }
  ${PAYMENT_METHODS_FRAGMENT}
  ${PLAN_FRAGMENT}
`;

export const RAFFLES_FRAGMENT = gql`
  fragment RaffleFragment on Raffle {
    id
    title
    description
    showDate
    showProgress
    minTickets
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

export const PLAN_USAGE_FRAGMENT = gql`
  fragment PlanUsageFragment on PlanUsage {
    id
    currentRaffles
    currentTickets
    status
    plan {
      ...PlanFragment
    }
    owner {
      ...UserFragment
    }
  }
  ${PLAN_FRAGMENT}
  ${USERS_FRAGMENT}
`;

export const PAYMENT_BASIC_FRAGMENT = gql`
  fragment PaymentBasicFragment on Payment {
    id
    buyerName
    nationalId
    email
    phone
    state
    paymentDate
    amount
    proofUrl
    paymentMethod
    status
  }
`;

export const TICKETS_FRAGMENT = gql`
  fragment TicketFragment on Ticket {
    id
    number
    status
    payment {
      ...PaymentBasicFragment
    }
  }
  ${PAYMENT_BASIC_FRAGMENT}
`;

export const PAYMENT_FRAGMENT = gql`
  fragment PaymentFragment on Payment {
    id
    buyerName
    nationalId
    email
    phone
    amount
    state
    paymentDate
    proofUrl
    paymentMethod
    status
    tickets {
      id
      number
      status
    }
  }
`;

export const NOTIFICATION_FRAGMENT = gql`
  fragment NotificationFragment on Notification {
    id
    description
    status
    createdAt
    updatedAt
  }
`;
