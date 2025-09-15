
import { gql } from '@apollo/client';
import { PAYMENT_FRAGMENT } from '../fragments';

export const CREATE_PAYMENT = gql`
  mutation CreatePayment($input: CreatePaymentInput!) {
    createPayment(input: $input) {
      ...PaymentFragment
    }
  }
  ${PAYMENT_FRAGMENT}
`;

export const UPDATE_PAYMENT = gql`
  mutation UpdatePayment($id: String!, $input: UpdatePaymentInput!) {
    updatePayment(id: $id, input: $input) {
      ...PaymentFragment
    }
  }
  ${PAYMENT_FRAGMENT}
`;

export const UPDATE_PAYMENT_STATUS = gql`
  mutation UpdatePaymentStatus($id: String!, $status: PaymentStatus!) {
    updatePaymentStatus(id: $id, status: $status) {
      ...PaymentFragment
    }
  }
  ${PAYMENT_FRAGMENT}
`;

export const DELETE_PAYMENT = gql`
  mutation DeletePayment($id: String!) {
    deletePayment(id: $id) {
      id
    }
  }
`;
