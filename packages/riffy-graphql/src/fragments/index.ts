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
    id
    name
    description
    price
    maxBingos
    maxBoards
    type
  }
`;

export const PLAN_USAGE_FRAGMENT = gql`
  fragment PlanUsageFragment on PlanUsage {
    id
    currentBingos
    currentBoards
    status
    plan {
      ...PlanFragment
    }
  }
  ${PLAN_FRAGMENT}
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

export const BOARD_BASIC_FRAGMENT = gql`
  fragment BoardBasicFragment on Board {
    id
    number
    status
  }
`;

export const BOARD_FRAGMENT = gql`
  fragment BoardFragment on Board {
    id
    number
    status
    payment {
      ...PaymentBasicFragment
    }
  }
  ${PAYMENT_BASIC_FRAGMENT}
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
      ...PlanUsageFragment
    }
  }
  ${PAYMENT_METHODS_FRAGMENT}
  ${PLAN_FRAGMENT}
  ${PLAN_USAGE_FRAGMENT}
`;

export const BINGOS_FRAGMENT = gql`
  fragment BingoFragment on Bingo {
    id
    title
    banner
    totalBoards
    price
    award
    drawnNumbers
    status
    showDate
    showProgress
    minBoards
    available
    sold
    progress
    drawDate
    createdAt
    updatedAt
    owner {
      ...UserFragment
    }
    boards {
      ...BoardFragment
    }
  }
  ${USERS_FRAGMENT}
  ${BOARD_FRAGMENT}
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
    boards {
      ...BoardBasicFragment
    }
    bingo {
      ...BingoFragment
    }
  }
  ${BOARD_BASIC_FRAGMENT}
  ${BINGOS_FRAGMENT}
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

export const DASHBOARD_STATS_FRAGMENT = gql`
  fragment DashboardStatsFragment on DashboardStats {
    totalBingos
    soldBoards
    unsoldBoards
    totalWinners
    totalEarnings
    topBuyers {
      buyerName
      nationalId
      totalBoards
      totalSpent
    }
    paymentsByState {
      state
      percentage
    }
    lastPayments {
      id
      buyerName
      amount
      nationalId
      status
      paymentMethod
      boards {
        ...BoardBasicFragment
      }
    }
  }
  ${BOARD_BASIC_FRAGMENT}
`;
