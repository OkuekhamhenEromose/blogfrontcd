import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://blogbackc.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: true
      }
    }
  },
  define: {
    'process.env': {
      VITE_API_BASE_URL: JSON.stringify('https://blogbackc.onrender.com/api/'),
      VITE_FRONTEND_URL: JSON.stringify('https://yourfrontend.netlify.app')
    }
  }
});