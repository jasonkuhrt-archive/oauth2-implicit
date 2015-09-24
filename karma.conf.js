
module.exports = function (config) {
  return config.set({
    frameworks: ['mocha'],
    files: [
      'test/**/*.coffee'
    ],
    preprocessors: {
      '**/*.js': ['webpack'],
      '**/*.coffee': ['webpack'],
    },
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
    reporters: [
      'mocha'
    ],
    mochaReporter: {
      output: 'minimal',
    }
  })
}
