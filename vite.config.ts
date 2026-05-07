import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: '/EatingCalc/',
  build: {
    outDir: 'docs',
  },
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: { 
    proxy: { 
      '/api': { 
        target: 'https://mooket.qi-e.top/market', 
        changeOrigin: true, 
        rewrite: (path) => path.replace(/^\/api/, '') 
      }
    }
  }
})
