/* Spec for Implicit Grant:
http://tools.ietf.org/html/rfc6749#section-4.2 */

var requestCredentials = require('./credentials-request')
var readCredentials = require('./credentials-read')



module.exports = oauth2implicit

/*

oauth2implicit :: {} -> Credentials

*/
function oauth2implicit(opts){
  return readCredentials(opts) || requestCredentials(opts)
}

oauth2implicit.requestCredentials = requestCredentials
oauth2implicit.readCredentials = readCredentials
oauth2implicit.parseCredentials = require('./credentials-parse')
