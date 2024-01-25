import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/swap': {
        target: "https://api.1inch.dev",
        changeOrigin: true,
        secure: false
      }, 
       '/api': {
        target: "http://localhost:3000",
         secure: false,
        changeOrigin: true
    }
    }
  },

  plugins: [react()],
})
