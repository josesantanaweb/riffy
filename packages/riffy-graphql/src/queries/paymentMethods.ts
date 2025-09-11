
import { gql } from '@apollo/client';
import { PAYMENT_METHODS_FRAGMENT } from '../fragments';

export const GET_PAYMENT_METHODS = gql`
  query PaymentMethods {
    paymentMethods {
      ...PaymentMethodsFragment
    }
  }
  ${PAYMENT_METHODS_FRAGMENT}
`;

export const GET_PAYMENT_METHOD = gql`
  query PaymentMethod($id: String!) {
    paymentMethod(id: $id) {
      ...PaymentMethodsFragment
    }
  }
  ${PAYMENT_METHODS_FRAGMENT}
`;
