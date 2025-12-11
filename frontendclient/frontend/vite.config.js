import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://studentgradesystem.onrender.com',
        changeOrigin: true,
      },
      '/images': {
        target: 'https://studentgradesystem.onrender.com',
        changeOrigin: true,
      }
    }
  },
})
