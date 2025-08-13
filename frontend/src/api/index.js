const isProduction = import.meta.env.PROD;

export const API_BASE_URL = isProduction 
  ? 'https://blogbackc.onrender.com/api/' 
  : 'http://localhost:8000/api/';

export const FRONTEND_URL = isProduction
  ? 'https://yourfrontend.netlify.app'
  : 'http://localhost:5173';