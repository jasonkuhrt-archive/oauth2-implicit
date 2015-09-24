module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    files: [
      'test/**/*.coffee'
    ],
    preprocessors: {
      '**/*.js': ['webpack'],
      '**/*.coffee': ['webpack'],
    },
    reporters: [
      'mocha'
    ],
    logLevel: config.LOG_WARN,
    webpack: {
      module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
          { test: /\.coffee$/, exclude: /node_modules/, loaders: ['coffee']},
        ],
      }
    },
    webpackMiddleware: {
      noInfo: true,
    },
  })
}
