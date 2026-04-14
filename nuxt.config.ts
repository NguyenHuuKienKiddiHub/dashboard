// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  runtimeConfig: {
    public: {
      // Accessible on both server and client — populated from .env
      apiBase: process.env.API_BASE ?? 'https://api.kiddihub.com/v2',
      apiToken: process.env.API_TOKEN ?? '',
    },
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  colorMode: {
    preference: 'light',
    fallback: 'light',
  },

  vite: {
    server: {
      allowedHosts: ['dashboard.kiddihub.test']
    }
  },

  imports: {
    dirs: ['composables/api']
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
