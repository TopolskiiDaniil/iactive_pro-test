import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  server: command === 'serve' ? {
    proxy: {
      '/api': {
        target: 'http://a0830433.xsph.ru',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  } : undefined,
  define: {
    'process.env.NODE_ENV': JSON.stringify(command === 'serve' ? 'development' : 'production'),
    'process.env.API_URL': command === 'serve'
      ? JSON.stringify('/api')
      : JSON.stringify('http://a0830433.xsph.ru')
  }
}))
