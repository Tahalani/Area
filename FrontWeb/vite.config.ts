import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
//host: true
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  }
})
