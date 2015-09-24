var baseConfig = require('./karma.conf')({ set: function (x) { return x }})
var customLaunchers = {
  sl_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Windows 7',
    version: '35'
  },
  sl_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: '30'
  },
  sl_ie_11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11'
  }
}



module.exports = function (config) {
  baseConfig.reporters.push('saucelabs')
  baseConfig.sauceLabs = {
    testName: 'oauth2-implicit',
    startConnect: false,
    tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
  }
  baseConfig.customLaunchers = customLaunchers
  baseConfig.browsers = Object.keys(customLaunchers)
  config.set(baseConfig)
}
