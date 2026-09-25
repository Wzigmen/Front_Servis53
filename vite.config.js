import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// Адреса бэкенда и бота для dev-сервера (в Docker запросы проксирует nginx)
const apiTarget = process.env.VITE_API_TARGET ?? 'http://localhost:5263'
const botTarget = process.env.VITE_BOT_TARGET ?? 'http://localhost:5001'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools()
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  server: {
    proxy: {
      '/api': {
        target: apiTarget,
        changeOrigin: true
      },
      '/images': {
        target: apiTarget,
        changeOrigin: true
      },
      '/bot': {
        target: botTarget,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/bot/, '')
      }
    }
  }
})
