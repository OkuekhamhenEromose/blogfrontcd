import axios from 'axios';
import { API_BASE_URL } from './index';

export const register = async (userData) => {
  const response = await axios.post(API_BASE_URL + 'register/', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(API_BASE_URL + 'login/', credentials);
  if (response.data.access) {
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const refreshToken = async () => {
  const refresh = localStorage.getItem('refresh_token');
  if (!refresh) return null;
  
  try {
    const response = await axios.post(API_BASE_URL + 'token/refresh/', { refresh });
    localStorage.setItem('access_token', response.data.access);
    return response.data.access;
  } catch (error) {
    logout();
    return null;
  }
};