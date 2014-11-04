// Spec for Implicit Grant:
// http://tools.ietf.org/html/rfc6749#section-4.2

var request = require('./request')
var get_credentials = require('./credentials-get')



// oauth2implicit :: {} -> Credentials

module.exports = function oauth2implicit(opts){
  return get_credentials(opts) || request(opts)
}

module.exports.request = request
module.exports.getCredentials = require('./credentials-get')
module.exports.clearCache = require('./credentials-cache').clear
module.exports.parseCredentials = require('./credentials-parse')
