import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: './src',
  base: '/binn-web/',
  build: {
    outDir: '../',
  },
  server: {
    host: '0.0.0.0',
  },
  plugins: [react()],
})
