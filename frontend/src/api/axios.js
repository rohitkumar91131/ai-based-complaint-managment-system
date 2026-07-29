import axios from 'axios';
import { toast } from 'sonner';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: {
    'Accept': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.response?.data?.message || 'An error occurred with the API.');
    return Promise.reject(error);
  }
);

export default apiClient;