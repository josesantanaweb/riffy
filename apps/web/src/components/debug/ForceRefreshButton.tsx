'use client';

import { useQuery } from '@apollo/client';
import { GET_PROFILE } from '../../api/graphql/queries/users';


export default function ForceRefreshButton() {
  const { refetch, loading } = useQuery(GET_PROFILE, {
    fetchPolicy: 'network-only'
  });

  const handleForceQuery = () => {
    refetch();
  };

  return (
    <button
      onClick={handleForceQuery}
      disabled={loading}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
    >
      {loading ? '⏳ Consultando...' : '🔄 Forzar Consulta GraphQL'}
    </button>
  );
}
