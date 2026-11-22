// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app:{
    head: {
      title: 'Idealicious',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Generate great ideas with Idealicious' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', type: 'image/x-icon', href: '/apple-touch-icon-180x180.png' },
      ]
    },
  },

  modules: [
    '@nuxt/ui',
    '@vite-pwa/nuxt',
    '@nuxtjs/i18n',    
  ],

  css: [
    '~/assets/css/main.css'
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Idealicious',
      short_name: 'Idealicious',
      display: 'standalone',
      description: 'Idealicious let you generate great ideas collectively',
      lang: 'fr-FR',
      theme_color: '#17a2b8',
      start_url: '/',
      categories: ['games', 'education'],
      screenshots : [        
        {
          "src": "screenshot2.png",
          "sizes": "600x533",
          "type": "image/png",
          "label": "Game play"
        },
        {
          "src": "screenshot.png",
          "sizes": "1300x672",
          "type": "image/png",
          "form_factor": "wide",
          "label": "Game play"
        }
      ],
      icons: [
        {
          "src": "pwa-64x64.png",
          "sizes": "64x64",
          "type": "image/png"
        },
        {
          "src": "pwa-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "pwa-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        },
        {
          "src": "maskable-icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
      ]
    },
    workbox: {
      navigateFallback: '/'
    },
    devOptions: {
      enabled: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: "module"
    }    
  },

  i18n: {
    /* module options */
    langDir: './lang/',
    strategy: 'no_prefix',
    defaultLocale: 'fr',
    locales: [
      {
        code: 'en',
        file: 'en-US.js',
        name:'English'
      },
      {
        code: 'fr',
        file: 'fr-FR.js',
        name:'Français'
      }
    ]
  },

  runtimeConfig: {
    public: {
      FIREBASE_API_KEY:'',
      FIREBASE_AUTH_DOMAIN: '',
      FIREBASE_DATABASE_URL: '',
      FIREBASE_PROJECT_ID: '',
      FIREBASE_STORAGE_BUCKET: '',
      FIREBASE_MESSAGING_SENDER_ID: '',
      FIREBASE_APP_ID: '',
      FIREBASE_MEASUREMENT_ID: '',
    }
  }
})