// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
  modules: ['@nuxt/eslint', '@nuxtjs/i18n'],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg', href: '/icon.svg' }
      ]
    }
  }
})
