import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkBackendHealth } from '../services/healthService';
import { setConnectionState } from '../store/slices/connectionSlice';

export const useBackendHealth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const performCheck = async () => {
      const result = await checkBackendHealth();
      if (isMounted) {
        dispatch(setConnectionState({
          status: result.connected ? 'connected' : 'disconnected',
          latency: result.latency
        }));
      }
    };

    // Initial check
    performCheck();

    // Poll every 30 seconds
    const interval = setInterval(performCheck, 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [dispatch]);
};