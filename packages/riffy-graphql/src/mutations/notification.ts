import { gql } from '@apollo/client';

export const UPDATE_NOTIFICATION_STATUS = gql`
  mutation UpdateNotificationStatus($id: String!, $status: NotificationStatus!) {
    updateNotificationStatus(id: $id, status: $status) {
      id
    }
  }
`;

export const UPDATE_NOTIFICATIONS_STATUS = gql`
  mutation UpdateNotificationsStatus($ids: [String!]!, $status: NotificationStatus!) {
    updateNotificationsStatus(ids: $ids, status: $status)
  }
`;
