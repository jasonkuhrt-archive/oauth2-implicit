/* Spec for Implicit Grant:
http://tools.ietf.org/html/rfc6749#section-4.2 */

import requestCredentials from './credentials-request'
import readCredentials from './credentials-read'
import parseCredentials from './credentials-parse'
import ObjectAssign from 'object.assign'

const assign = ObjectAssign.getPolyfill()



// oauth2implicit :: {} -> Credentials
function oauth2implicit (opts) {
  return readCredentials(opts) || requestCredentials(opts)
}

assign(oauth2implicit, {
  requestCredentials,
  readCredentials,
  parseCredentials,
})



export {
  oauth2implicit as default,
  oauth2implicit,
  requestCredentials,
  parseCredentials,
  readCredentials,
}
