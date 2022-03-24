export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Idealicious',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Generate great ideas with Idealicious' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/custom-theme.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/firebase.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    ['nuxt-vue-material', {
      theme: 'default',
      components: ['MdDrawer', 'MdRadio', 'MdMenu', 'MdContent', 'MdList', 'MdButton',
        'MdToolbar', 'MdIcon', 'MdApp', 'MdCard', 'MdField',
        'MdCheckbox', 'MdSnackbar', 'MdSwitch', 'MdTooltip',
        "MdDivider", "MdDialog", "MdDialogConfirm", "MdAvatar", "MdBadge"
      ]
    }],
    '@nuxtjs/i18n'
  ],

  i18n: {
    /* module options */
    lazy: true,
    langDir: 'lang/',
    strategy: 'no_prefix',
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        file: 'en-US.js'
      },
      {
        code: 'fr',
        file: 'fr-FR.js'
      }
    ],
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    /*
    ** Manifest for standalone app
    */
    manifest: {
      name: 'Idealicious',
      short_name: 'Idealicious',
      display: 'standalone',
      description: 'Idealicious let you generate great ideas collectively',
      lang: 'en-US'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
