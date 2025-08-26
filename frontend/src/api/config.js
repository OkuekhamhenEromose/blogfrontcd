// for reference but not neccessary

export const API_BASE_URL = 'https://blogbackc.onrender.com/api/';
export const POSTS_URL = `${API_BASE_URL}posts/`;
export const CATEGORIES_URL = `${API_BASE_URL}categories/`;
export const LOGIN_URL = `${API_BASE_URL}login/`;
export const REGISTER_URL = `${API_BASE_URL}register/`;
export const TOKEN_REFRESH_URL = `${API_BASE_URL}token/refresh/`;

// For environment-specific configurations
export const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173';