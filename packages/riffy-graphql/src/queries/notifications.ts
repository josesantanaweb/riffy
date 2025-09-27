import { gql } from '@apollo/client';
import { NOTIFICATION_FRAGMENT } from '../fragments';

export const GET_NOTIFICATIONS = gql`
  query Notifications {
    notifications {
      ...NotificationFragment
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;
