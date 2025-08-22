'use client';

import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { tokenStorage } from '@/utils/tokenStorage';
import { useAuth } from '@/hooks/auth/useAuth';
import ForceRefreshButton from './ForceRefreshButton';
import ManualRefreshButton from './ManualRefreshButton';
import RefreshStatusIndicator from './RefreshStatusIndicator';

interface JWTPayload {
  id: string;
  email: string;
  username: string;
  name: string;
  image: string;
  iat: number;
  exp: number;
}

export default function RefreshTokenDebugger() {
  const { isAuthenticated } = useAuth();

  const [tokenInfo, setTokenInfo] = useState<{
    accessToken: string | null;
    refreshToken: string | null;
    decoded: JWTPayload | null;
    timeToExpiry: number;
    refreshTimeToExpiry: number;
    expired: boolean;
  }>({
    accessToken: null,
    refreshToken: null,
    decoded: null,
    timeToExpiry: 0,
    refreshTimeToExpiry: 0,
    expired: false
  });

  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 19)]);
  };

    const updateTokenInfo = () => {
    const accessToken = tokenStorage.getAccessToken();
    const refreshToken = tokenStorage.getRefreshToken();

    let decoded: JWTPayload | null = null;
    let timeToExpiry = 0;
    let refreshTimeToExpiry = 0;
    let expired = false;

    if (accessToken) {
      try {
        decoded = jwtDecode<JWTPayload>(accessToken);
        const now = Math.floor(Date.now() / 1000);
        timeToExpiry = decoded.exp - now;
        expired = timeToExpiry <= 0;

        const prevExpired = tokenInfo.expired;
        const prevTimeToExpiry = tokenInfo.timeToExpiry;

        if (expired && !prevExpired) {
          addLog('🔴 Access Token EXPIRADO - Se necesita refresh');
        } else if (!expired && timeToExpiry <= 30 && prevTimeToExpiry > 30) {
          addLog(`🟡 Access Token expira en ${timeToExpiry}s - Preparando refresh`);
        } else if (!expired && timeToExpiry <= 60 && prevTimeToExpiry > 60) {
          addLog(`🟠 Access Token expira en ${timeToExpiry}s`);
        }
      } catch {
        addLog('❌ Error decodificando token');
      }
    } else if (tokenInfo.accessToken) {
      addLog('❌ Access Token removido');
    }

    if (refreshToken) {
      try {
        const refreshDecoded = jwtDecode<{ exp: number }>(refreshToken);
        const now = Math.floor(Date.now() / 1000);
        refreshTimeToExpiry = refreshDecoded.exp - now;
      } catch {
        refreshTimeToExpiry = 0;
      }
    }

    setTokenInfo({
      accessToken,
      refreshToken,
      decoded,
      timeToExpiry,
      refreshTimeToExpiry,
      expired
    });
  };

  useEffect(() => {
    updateTokenInfo();
    addLog('🚀 Debugger iniciado');

    const interval = setInterval(updateTokenInfo, 1000);

    const handleTokenChange = () => {
      addLog('🔄 Token actualizado detectado');
      updateTokenInfo();
    };

    const handleManualRefresh = (event: CustomEvent) => {
      addLog(event.detail.message);
      updateTokenInfo();
    };

    window.addEventListener('tokenChanged', handleTokenChange);
    window.addEventListener('manualRefreshSuccess', handleManualRefresh as EventListener);

    return () => {
      clearInterval(interval);
      window.removeEventListener('tokenChanged', handleTokenChange);
      window.removeEventListener('manualRefreshSuccess', handleManualRefresh as EventListener);
    };
  }, []);

  const clearTokens = () => {
    tokenStorage.removeTokens();
    addLog('🗑️ Tokens eliminados');
    updateTokenInfo();
  };

  const formatTime = (seconds: number) => {
    if (seconds <= 0) return 'EXPIRADO';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <RefreshStatusIndicator />

      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">🔍 JWT Token Debugger</h2>
        <p className="text-gray-600">Monitor y prueba el sistema de autenticación JWT</p>
      </div>

      <div className={`p-4 rounded-lg border-l-4 ${
        isAuthenticated
          ? 'bg-green-50 border-green-500'
          : 'bg-red-50 border-red-500'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">
              {isAuthenticated ? '🟢' : '🔴'}
            </span>
            <div>
              <h3 className="font-semibold text-lg">Estado de Sesión</h3>
              <span className={`font-mono text-sm ${
                isAuthenticated ? 'text-green-700' : 'text-red-700'
              }`}>
                {isAuthenticated ? '✅ AUTENTICADO' : '❌ NO AUTENTICADO'}
              </span>
            </div>
          </div>
          {!isAuthenticated && (
            <a
              href="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Ir a Login
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-gray-800">🎫 Access Token</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              tokenInfo.expired ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}>
              {tokenInfo.accessToken ? (tokenInfo.expired ? 'EXPIRADO' : 'ACTIVO') : 'AUSENTE'}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Estado:</span>
              <span className="font-mono text-sm">
                {tokenInfo.accessToken ? '✅ Presente' : '❌ Ausente'}
                {tokenInfo.accessToken && tokenInfo.decoded && (
                  <span className="ml-2 text-blue-600 font-bold">
                    ({formatTime(tokenInfo.timeToExpiry)})
                  </span>
                )}
              </span>
            </div>

            {tokenInfo.decoded && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Tiempo restante</span>
                  <span>{formatTime(tokenInfo.timeToExpiry)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      tokenInfo.timeToExpiry <= 0 ? 'bg-red-500' :
                      tokenInfo.timeToExpiry <= 30 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{
                      width: `${Math.max(0, Math.min(100, (tokenInfo.timeToExpiry / 120) * 100))}%`
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-gray-800">🔄 Refresh Token</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              tokenInfo.refreshTimeToExpiry <= 0 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {tokenInfo.refreshToken ? (tokenInfo.refreshTimeToExpiry <= 0 ? 'EXPIRADO' : 'ACTIVO') : 'AUSENTE'}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Estado:</span>
              <span className="font-mono text-sm">
                {tokenInfo.refreshToken ? '✅ Presente' : '❌ Ausente'}
                {tokenInfo.refreshToken && (
                  <span className="ml-2 text-green-600 font-bold">
                    ({formatTime(tokenInfo.refreshTimeToExpiry)})
                  </span>
                )}
              </span>
            </div>

            {tokenInfo.refreshToken && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Tiempo restante</span>
                  <span>{formatTime(tokenInfo.refreshTimeToExpiry)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      tokenInfo.refreshTimeToExpiry <= 0 ? 'bg-red-500' :
                      tokenInfo.refreshTimeToExpiry <= 60 ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}
                    style={{
                      width: `${Math.max(0, Math.min(100, (tokenInfo.refreshTimeToExpiry / 120) * 100))}%`
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow mb-6">
        <h3 className="font-bold text-lg text-gray-800 mb-4">👤 Información del Usuario</h3>
        {tokenInfo.decoded ? (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">ID:</span>
              <span className="font-mono font-semibold">{tokenInfo.decoded.id}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Email:</span>
              <span className="font-mono font-semibold">{tokenInfo.decoded.email}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Username:</span>
              <span className="font-mono font-semibold">{tokenInfo.decoded.username}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Expira:</span>
              <span className="font-mono font-semibold">
                {new Date(tokenInfo.decoded.exp * 1000).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">🔍 No hay token para decodificar</p>
          </div>
        )}
      </div>

      <div className="bg-white border rounded-xl p-6 shadow-sm mb-6">
        <h3 className="font-bold text-lg text-gray-800 mb-4">⚡ Acciones de Prueba</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={clearTokens}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            🗑️ Limpiar Tokens
          </button>
          <ForceRefreshButton />
          <ManualRefreshButton />
        </div>
      </div>

      <div className="bg-white border rounded-xl shadow-sm mb-6 overflow-hidden">
        <div className="bg-gray-900 text-white px-6 py-3">
          <h3 className="font-bold text-lg flex items-center gap-2">
            📝 Log de Eventos
            <span className="text-sm text-gray-300 font-normal">({logs.length} entradas)</span>
          </h3>
        </div>
        <div className="bg-black text-green-400 p-6 font-mono text-sm h-64 overflow-y-auto">
          {logs.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p>⏳ Esperando eventos...</p>
              <p className="text-xs mt-2">Los eventos aparecerán aquí cuando uses las funciones de prueba</p>
            </div>
          ) : (
            <div className="space-y-1">
              {logs.map((log, index) => (
                <div key={index} className="hover:bg-gray-900 px-2 py-1 rounded transition-colors">
                  <span className="text-gray-500 text-xs mr-2">[{index + 1}]</span>
                  {log}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">📋</span>
          <h3 className="font-bold text-lg text-blue-900">Guía de Uso</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
              <p className="text-sm text-blue-800">Haz login si no lo has hecho</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
              <p className="text-sm text-blue-800">Observa el token que expira en 2 minutos</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
              <p className="text-sm text-blue-800">Usa "🔄 Refresh Manual" para renovar tokens expirados</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
              <p className="text-sm text-blue-800">Usa "🔄 Forzar Consulta GraphQL" para probar el interceptor</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">5</span>
              <p className="text-sm text-blue-800">Observa los logs para ver la actividad en tiempo real</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
