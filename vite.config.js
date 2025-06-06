import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/admin/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['sl1-server.io.vn', 'localhost'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
