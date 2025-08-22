'use client';

import { useState, useEffect } from 'react';
import { tokenStorage } from '@/utils/tokenStorage';
import { jwtDecode } from 'jwt-decode';

export default function ManualRefreshButton() {
  const [loading, setLoading] = useState(false);
  const [lastResult, setLastResult] = useState<string | null>(null);

  useEffect(() => {
    if (lastResult && !loading) {
      const timer = setTimeout(() => {
        setLastResult(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [lastResult, loading]);

  const refreshTokenManually = async () => {
    setLoading(true);
    setLastResult(null);

    try {
      const refreshToken = tokenStorage.getRefreshToken();
      const accessToken = tokenStorage.getAccessToken();

      if (!refreshToken || !accessToken) {
        setLastResult('❌ No hay tokens disponibles');
        return;
      }

      const decoded = jwtDecode<{ id: string }>(accessToken);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query RefreshToken($id: String!, $refreshToken: String!) {
              refreshToken(id: $id, refreshToken: $refreshToken) {
                accessToken
                refreshToken
                user { id email username name image }
              }
            }
          `,
          variables: {
            id: decoded.id,
            refreshToken,
          },
        }),
      });

      const data = await response.json();

      if (data.errors || !data.data?.refreshToken) {
        setLastResult('❌ Error en el refresh');
        return;
      }

      const authData = data.data.refreshToken;

      tokenStorage.setAccessToken(authData.accessToken);
      tokenStorage.setRefreshToken(authData.refreshToken);

      setLastResult('✅ Token renovado exitosamente');

      window.dispatchEvent(new CustomEvent('manualRefreshSuccess', {
        detail: { message: '🔄 Refresh manual exitoso' }
      }));

    } catch {
      setLastResult('❌ Error en el refresh');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={refreshTokenManually}
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
      >
        {loading ? '⏳ Renovando...' : '🔄 Refresh Manual'}
      </button>
      {lastResult && (
        <div className={`text-sm font-mono p-2 rounded ${
          lastResult.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {lastResult}
        </div>
      )}
    </div>
  );
}
