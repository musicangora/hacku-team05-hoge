export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Niiiiice! - 共感を集めるゲーム',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      // { hid: 'og:site_name', property: 'og:site_name', content: 'Niiiiice!' },
      { hid: 'og:url', property: 'og:url', content: 'https://hacku-api.waku-waku-club.com/' },
      { hid: 'og:title', property: 'og:title', content: 'Niiiiice! - 共感を集めるゲーム' },
      { hid: 'og:description', property: 'og:description', content: '共通認識＆アイスブレイクを同時に！' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:title', name: 'twitter:title', content: 'Niiiiice! - 共感を集めるゲーム' },
      { hid: 'twitter:description', property: 'twitter:description', content: '共通認識＆アイスブレイクを同時に！' }
      // { hid: 'og:image', property: 'og:image', content: '/assets/images/hacku-05.png' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/localStorage.js' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308

    /* テスト環境 */
    // proxy: false,
    // baseURL: 'http://localhost:8080'

    /* 本番環境 */
    baseURL: 'https://hacku-api.waku-waku-club.com/'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
