const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'Meblife',
    meta: [
      { charset: 'utf-8' },

      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Lato:400,700|Ubuntu:400,700&amp;display=swap&amp;subset=latin-ext" },
      { rel: "stylesheet", href: "https://cdn.quilljs.com/1.3.6/quill.core.css" },
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    "~assets/scss/_vars.scss",
    "~assets/scss/reset.scss",
    "~assets/scss/styles.scss"
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '@/plugins/error' },
    { src: '@/plugins/api' },
    { src: '@/plugins/vue-awesome-swiper', mode: 'client' },
    { src: '@/plugins/vue-show-slide', mode: 'client' },
    { src: '@/plugins/vue-js-modal', mode: 'client' },
    { src: '@/plugins/vue-masonry', mode: 'client' },
    // { src: '@/plugins/vue-click-outside', mode: 'client' },
    { src: "@/plugins/url" },
    { src: "@/plugins/vue-ripple-directive", mode: "client" },
    { src: "@/plugins/loader" },
  ],
  router: {
    middleware: 'i18n',
    prefetchLinks: false
  },
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/moment'
  ],
  moment: {
    locales: ['ru']
  },
  /*
  ** Nuxt.js modulesd
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    ['@nuxtjs/axios', { proxy: true }],
    "@nuxtjs/style-resources",
    "nuxt-svg-loader",
    [
      'nuxt-lazy-load', {
        // These are the default values
        images: true,
        videos: true,
        audios: true,
        iframes: true,
        native: false,
        polyfill: true,
        directiveOnly: false,

        // Default image must be in the static folder
        // defaultImage: '/images/default-image.jpg',

        loadingClass: 'is-loading',
        loadedClass: 'is-lazyloaded',
        appendClass: 'lazyload',

      }
    ],
    'vue-scrollto/nuxt',
    'cookie-universal-nuxt',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'ua',
            file: 'ua.js',
            iso: "ua-UA"
          },
          {
            code: 'ru',
            file: 'ru.js',
            iso: "ru-RU"

          },
        
        ],
        seo: true,
        lazy: true,
        langDir: 'lang/',
        strategy: "prefix",
        defaultLocale: "ru",
        fallbackLocale: 'ru',
        vuex: {
          syncLocale: true
        },
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected'
        }
      }
    ],

  ],
  proxy: {
    "/api/": { target: "http://localhost:8080", pathRewrite: { "^/api/": "" } }
  },
  styleResources: {
    scss: ["~assets/scss/_vars.scss", "~assets/scss/_mixins.scss"]
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  svgLoader: {
    svgoConfig: {
      plugins: [
        { prefixIds: false } // Disables prefixing for SVG IDs
      ]
    }
  },
  build: {
    analyze: false,
    plugins: [
      new LodashModuleReplacementPlugin
    ]
  }
}
