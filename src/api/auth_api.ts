// src/services/api.ts
import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // Your backend's base URL
  withCredentials: true, // This is important for cookies, if you use them
});

// ✨ This is the magic part: an interceptor that automatically adds the token
// to every single request!
api.interceptors.request.use(
  (config) => {
    // Get the token from wherever you store it (e.g., localStorage)
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Add the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;