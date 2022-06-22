import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './'
  },
  server: {
    host: '0.0.0.0',
    base: '/binn-web/'
  },
  plugins: [react()],
})
