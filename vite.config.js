import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api-sumbar': {
        target: 'https://api-web.sumbarprov.go.id/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-sumbar/, '')
      },
      '/api-ppid': {
        target: 'https://ppid.sumbarprov.go.id/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-ppid/, '')
      }
    }
  }
})
