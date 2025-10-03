import { gql } from '@apollo/client';
import { TICKETS_FRAGMENT } from '../fragments';

export const UPDATE_TICKET_STATUS = gql`
  mutation UpdateTicketStatus($id: String!, $status: TicketStatus!) {
    updateTicketStatus(id: $id, status: $status) {
      ...TicketFragment
    }
  }
  ${TICKETS_FRAGMENT}
`;
