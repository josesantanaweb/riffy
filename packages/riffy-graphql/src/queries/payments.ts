import { gql } from '@apollo/client';
import { PAYMENT_FRAGMENT } from '../fragments';

export const GET_PAYMENTS = gql`
  query Payments {
    payments {
      ...PaymentFragment
    }
  }
  ${PAYMENT_FRAGMENT}
`;

export const GET_PAYMENT = gql`
  query Payment($id: String!) {
    payment(id: $id) {
      ...PaymentFragment
    }
  }
  ${PAYMENT_FRAGMENT}
`;

export const GET_PAYMENT_BY_NATIONAL_ID = gql`
  query PaymentByNationalId($nationalId: String!) {
    paymentByNationalId(nationalId: $nationalId) {
      ...PaymentFragment
    }
  }
  ${PAYMENT_FRAGMENT}
`;
