import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'
  
  const server = {
    host: isDev,
    allowedHosts: isDev ? ["f7b0d0fdee8b.ngrok-free.app"] : undefined // ngrok (somente dev)
  }

  const workbox = isDev ? { globPatterns: [] } : undefined
  
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
        workbox,
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
    server,
    preview: {
      allowedHosts: ["kyc.hallancosta.com"],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'dist-dev/',
          'node_modules/',
          'src/test/',
          'src/__tests__/',
          '**/*.config.*',
          '**/dist/**',
          '**/*.d.ts',
          '**/*.spec.ts',
          '**/*.test.ts',
          '**/*.spec.tsx',
          '**/*.test.tsx',
          'src/main.tsx'
        ]
      }
    }
  }
})
