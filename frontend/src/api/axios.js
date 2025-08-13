import axios from 'axios';
import { API_BASE_URL, refreshToken } from './index';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const newToken = await refreshToken();
      if (newToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;