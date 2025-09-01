import { useQuery } from '@apollo/client';
import { GET_TICKETS_BY_RAFFLE_ID } from '@riffy/graphql';

export const useTicketsByRaffleId = (raffleId: string) => {
  const { data, error, loading } = useQuery(GET_TICKETS_BY_RAFFLE_ID, {
    variables: { raffleId },
    skip: !raffleId,
    fetchPolicy: 'network-only',
  });

  return {
    data: data?.ticketsByRaffleId || null,
    error,
    loading,
  };
};
