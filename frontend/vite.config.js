import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  
  // Remove proxy for production - it's only for dev
  server: process.env.NODE_ENV === 'production' ? {} : {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  }
})