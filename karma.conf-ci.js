/* eslint-disable */

var baseConfig = require('./karma.conf')({ set: function (x) { return x }})

var customLaunchers = [
  {
    browserName: 'chrome',
  },
  {
    browserName: 'firefox',
  },
  {
    browserName: 'internet explorer',
  },
  {
    browserName: 'safari',
  },
].map(function (l) {
  l.base = 'SauceLabs'
  l.name = l.browserName
  + '-platform-' + (l.platform || 'default')
  + '-browser-version-' + (l.version || 'default')
  return l
})



module.exports = function (config) {
  baseConfig.reporters.push('saucelabs')
  baseConfig.sauceLabs = {
    testName: 'oauth2-implicit',
    startConnect: false,
    tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
  }
  baseConfig.customLaunchers = customLaunchers.reduce(function(ls,l){
    ls[l.name] = l
    return ls
  }, {})
  baseConfig.browsers = customLaunchers.map(function(l){ return l.name })
  config.set(baseConfig)
}
