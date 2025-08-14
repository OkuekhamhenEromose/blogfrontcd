import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // all API requests start with /api now
        target: 'http://localhost:8000', // in dev, talk to Django
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // keep /api
        secure: false
      }
    }
  },
  define: {
    'process.env': {
      VITE_API_BASE_URL: JSON.stringify('http://localhost:8000/api/'), // matches Django
      VITE_FRONTEND_URL: JSON.stringify('http://localhost:5173')
    }
  }
});

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api/blog': {
//         target: 'https://blogbackc.onrender.com',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api\/blog/,'/api/blog'),
//         secure: false
//       }
//     }
//   },
//   define: {
//     'process.env': {
//       VITE_API_BASE_URL: JSON.stringify('https://blogbackc.onrender.com/api/'),
//       VITE_FRONTEND_URL: JSON.stringify('https://yourfrontend.netlify.app')
//     }
//   }
// });