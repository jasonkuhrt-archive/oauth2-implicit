/* Spec for Implicit Grant:
http://tools.ietf.org/html/rfc6749#section-4.2 */

var requestCredentials = require('./credentials-request')
var getCredentials = require('./credentials-get')



module.exports = oauth2implicit

/*

oauth2implicit :: {} -> Credentials

*/
function oauth2implicit(opts){
  return getCredentials(opts) || requestCredentials(opts)
}

oauth2implicit.request = requestCredentials
oauth2implicit.getCredentials = getCredentials
oauth2implicit.parseCredentials = require('./credentials-parse')
oauth2implicit.clearCache = require('./credentials-cache').clear
