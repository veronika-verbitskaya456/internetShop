import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repositoryName = 'internetShop'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? `/${repositoryName}/` : '/',
  plugins: [
    react(),
    {
      name: 'gh-pages-spa-fallback',
      closeBundle() {
        if (mode !== 'production') return

        const distDir = resolve(__dirname, 'dist')
        const indexPath = resolve(distDir, 'index.html')

        if (existsSync(indexPath)) {
          copyFileSync(indexPath, resolve(distDir, '404.html'))
        }
      },
    },
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.escuelajs.co',
        changeOrigin: true,
      },
    },
  },
}))
