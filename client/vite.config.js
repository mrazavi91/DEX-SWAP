import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
       '/api': {
        target: "http://localhost:3000",
        secure: false,
    },
      '/swap': {
        target: "https://api.1inch.dev",
        secure: false,
        changeOrigin: true
      }
    }
  },
  plugins: [react()],
})
