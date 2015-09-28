/* Spec for Implicit Grant:
http://tools.ietf.org/html/rfc6749#section-4.2 */

import start from './start'
import finish from './finish'
import parseCredentials from './credentials-parse'
import ObjectAssign from 'object.assign'

const assign = ObjectAssign.getPolyfill()



// run :: Options -> Credentials
const run = (options) => (
  finish(options) || start(options)
)

assign(run, {
  start,
  finish,
  parseCredentials,
})



export {
  run as default,
  run,
  start,
  finish,
  parseCredentials,
}
