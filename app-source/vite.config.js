import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

const base = '/ward-skills-log/'

export default defineConfig({
  base,
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'icons/icon-192.png',
        'icons/icon-512.png',
        'icons/apple-touch-icon.png',
        'icons/favicon-32.png',
      ],
      manifest: {
        name: 'Ward Skills Log',
        short_name: 'Ward Skills',
        description: 'Y4 procedure skills tracker for ward work.',
        start_url: base,
        scope: base,
        id: base,
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#0F1419',
        theme_color: '#0F1419',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        navigateFallback: `${base}index.html`,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest,woff2}'],
      },
    }),
  ],
})
