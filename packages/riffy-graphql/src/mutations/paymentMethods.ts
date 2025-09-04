import { gql } from '@apollo/client';
import { PAYMENT_METHODS_FRAGMENT } from '../fragments';

export const CREATE_PAYMENT_METHOD = gql`
  mutation CreatePaymentMethod($input: CreatePaymentMethodInput!) {
    createPaymentMethod(input: $input) {
      ...PaymentMethodsFragment
    }
  }
  ${PAYMENT_METHODS_FRAGMENT}
`;

export const UPDATE_PAYMENT_METHOD = gql`
  mutation UpdatePaymentMethod($id: String!, $input: UpdatePaymentMethodInput!) {
    updatePaymentMethod(id: $id, input: $input) {
      ...PaymentMethodsFragment
    }
  }
  ${PAYMENT_METHODS_FRAGMENT}
`;

export const DELETE_PAYMENT_METHOD = gql`
  mutation DeletePaymentMethod($id: String!) {
    deletePaymentMethod(id: $id) {
      id
    }
  }
`;
