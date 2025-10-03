import { useMutation } from '@apollo/client';
import { UPDATE_TICKET_STATUS } from '@riffy/graphql';
import { TicketStatus } from '@riffy/types';

export const useUpdateTicketStatus = () => {
  const [updateTicketStatusMutation, { data, error, loading }] = useMutation(
    UPDATE_TICKET_STATUS,
    {
      refetchQueries: ['TicketsByRaffle'],
      awaitRefetchQueries: true,
    },
  );

  const updateTicketStatus = (id: string, status: TicketStatus) => {
    return updateTicketStatusMutation({
      variables: {
        id,
        status,
      },
    });
  };

  return {
    updateTicketStatus,
    data: data?.updateTicketStatus || null,
    error,
    loading,
  };
};
