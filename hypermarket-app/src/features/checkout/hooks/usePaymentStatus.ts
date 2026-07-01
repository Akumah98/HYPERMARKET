import { useState, useEffect, useRef, useCallback } from 'react';
import { checkoutService } from '../services/checkoutService';

export const usePaymentStatus = () => {
  const [status, setStatus] = useState<'SUCCESSFUL' | 'FAILED' | 'PENDING' | 'EXPIRED'>('PENDING');
  const [polling, setPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const intervalId = useRef<any>(null);

  const stopPolling = useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
    setPolling(false);
  }, []);

  const checkStatus = useCallback(async (transId: string) => {
    try {
      const responseStatus = await checkoutService.getPaymentStatus(transId);
      setStatus(responseStatus);
      if (responseStatus !== 'PENDING') {
        stopPolling();
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Error checking payment status');
      setStatus('FAILED');
      stopPolling();
    }
  }, [stopPolling]);

  const startPolling = useCallback((transId: string) => {
    stopPolling();
    setStatus('PENDING');
    setPolling(true);
    setError(null);

    // Initial check
    checkStatus(transId);

    // Set interval check every 5 seconds
    intervalId.current = setInterval(() => {
      checkStatus(transId);
    }, 5000);
  }, [checkStatus, stopPolling]);

  useEffect(() => {
    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, []);

  return {
    status,
    polling,
    error,
    startPolling,
    stopPolling,
  };
};
