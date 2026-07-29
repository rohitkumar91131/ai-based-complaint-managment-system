import apiClient from '../api/axios';

export const checkBackendHealth = async () => {
  const start = Date.now();
  try {
    // Timeout set to 5 seconds as requested
    await apiClient.get('/health', { timeout: 5000 });
    const latency = Date.now() - start;
    return { connected: true, latency };
  } catch (error) {
    return { connected: false };
  }
};