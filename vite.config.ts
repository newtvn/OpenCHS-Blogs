import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: '/OpenCHS-Blogs/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8000,
  },
  define: {
    // Expose the env var so it is available via import.meta.env at build time.
    // Vite already handles VITE_* vars natively; this entry is kept for
    // explicitness and to allow overriding in defineConfig consumers.
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify(
      process.env.VITE_API_BASE_URL ?? 'http://localhost:3001/api/v1'
    ),
  },
})
