import { useQuery } from '@apollo/client';
import { GET_TICKETS_BY_NATIONAL_ID } from '@riffy/graphql';

export const useTicketsByNationalId = (raffleId: string, nationalId: string) => {
  const { data, error, loading } = useQuery(GET_TICKETS_BY_NATIONAL_ID, {
    variables: { raffleId, nationalId },
    skip: !nationalId || !raffleId,
    fetchPolicy: 'network-only',
  });

  return {
    data: data?.ticketsByNationalId || null,
    raffle: data?.raffle || null,
    error,
    loading,
  };
};
