import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://yourapi.com',
  timeout: 10000,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  // Add auth tokens or logging
  return config;
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    // Global error handling
    return Promise.reject(err);
  }
);

export default instance;
