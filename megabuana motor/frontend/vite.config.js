import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['styled-jsx/babel'],
      },
    }),
  ],
  server: {
    port: 5174,
    proxy: {
      '/api': 'http://localhost:4001',
      '/uploads': 'http://localhost:4001'
    }
  }
})
