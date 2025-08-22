'use client';

import { useState, useEffect } from 'react';

export default function RefreshStatusIndicator() {
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
    timestamp: string;
  }>({ type: null, message: '', timestamp: '' });

  useEffect(() => {
    const handleManualRefresh = () => {
      setStatus({
        type: 'success',
        message: 'Token renovado manualmente',
        timestamp: new Date().toLocaleTimeString()
      });
    };

    const handleTokenChange = () => {
      setStatus({
        type: 'success',
        message: 'Token renovado automáticamente',
        timestamp: new Date().toLocaleTimeString()
      });
    };

    window.addEventListener('manualRefreshSuccess', handleManualRefresh);
    window.addEventListener('tokenChanged', handleTokenChange);

    return () => {
      window.removeEventListener('manualRefreshSuccess', handleManualRefresh);
      window.removeEventListener('tokenChanged', handleTokenChange);
    };
  }, []);

  if (!status.type) return null;

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg transition-all duration-500 ${
      status.type === 'success' ? 'bg-green-100 border-l-4 border-green-500' : 'bg-red-100 border-l-4 border-red-500'
    }`}>
      <div className="flex items-center space-x-2">
        <span className="text-lg">
          {status.type === 'success' ? '✅' : '❌'}
        </span>
        <div>
          <p className={`font-semibold ${status.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
            {status.message}
          </p>
          <p className="text-sm text-gray-600">
            {status.timestamp}
          </p>
        </div>
        <button
          onClick={() => setStatus({ type: null, message: '', timestamp: '' })}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
