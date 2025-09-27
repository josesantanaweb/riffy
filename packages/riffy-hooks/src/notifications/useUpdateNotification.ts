import { useMutation } from '@apollo/client';
import { UPDATE_NOTIFICATION_STATUS } from '@riffy/graphql';
import { NotificationStatus } from '@riffy/types';

export const useUpdateNotification = () => {
  const [updateNotificationMutation, { data, error, loading }] = useMutation(
    UPDATE_NOTIFICATION_STATUS,
    {
      refetchQueries: ['Notifications'],
      awaitRefetchQueries: true,
    },
  );

  const updateNotification = (id: string, status: NotificationStatus) => {
    return updateNotificationMutation({
      variables: {
        id,
        status,
      },
    });
  };

  return {
    updateNotification,
    data: data?.updateNotification || null,
    error,
    loading,
  };
};
