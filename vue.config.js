module.exports = {
  // publicPath: '/',
  devServer: {
    // https: true,
    // port: 3000,
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch');
    config.plugin('html').tap(args => {
      args[0].title = 'Template'
      return args
    });
  },
  transpileDependencies: [
    'vuetify'
  ],
  css: {
    sourceMap: true
  },
  pwa: {
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#FFFFFF',
    workboxOptions: {
      navigateFallback: '/index.html'
    },
    themeColor: '#FFFFFF',
    msTileColor: '#FFFFFF'
  },
  lintOnSave: true
}