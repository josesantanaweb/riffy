import { useQuery } from '@apollo/client';
import { GET_TICKETS_BY_RAFFLE } from '@riffy/graphql';

export const useTicketsByRaffle = (raffleId: string) => {
  const { data, error, loading } = useQuery(GET_TICKETS_BY_RAFFLE, {
    variables: { raffleId },
    skip: !raffleId,
    fetchPolicy: 'network-only',
  });

  return {
    data: data?.ticketsByRaffle || null,
    error,
    loading,
  };
};
