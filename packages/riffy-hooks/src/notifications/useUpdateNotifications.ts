import { useMutation } from '@apollo/client';
import { UPDATE_NOTIFICATIONS_STATUS } from '@riffy/graphql';
import { NotificationStatus } from '@riffy/types';

export const useUpdateNotifications = () => {
  const [updateNotificationsMutation, { data, error, loading }] = useMutation(
    UPDATE_NOTIFICATIONS_STATUS,
    {
      refetchQueries: ['Notifications'],
      awaitRefetchQueries: true,
    },
  );

  const updateNotifications = (ids: string[], status: NotificationStatus) => {
    return updateNotificationsMutation({
      variables: {
        ids,
        status,
      },
    });
  };

  return {
    updateNotifications,
    data: data?.updateNotifications || null,
    error,
    loading,
  };
};
