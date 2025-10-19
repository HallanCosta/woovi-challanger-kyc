import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'
  
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        injectRegister: null,
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true,
        },
        ...(isDev ? { workbox: { globPatterns: [] } } : {}),
        includeAssets: ['vite.svg'],
        manifest: {
          id: '/',
          name: 'KYC Verification - Woovi',
          short_name: 'KYC Woovi',
          description: 'Formulário KYC com suporte offline e instalação como app.',
          theme_color: '#141414',
          background_color: '#141414',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          display_override: ['standalone', 'minimal-ui', 'browser'],
          icons: [
            {
              src: '/vite.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'any maskable'
            }
          ]
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  }
})
