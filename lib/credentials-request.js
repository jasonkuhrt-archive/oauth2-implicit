import { uri } from './utils'



/* Spec for access_token request params:
http://tools.ietf.org/html/rfc6749#section-4.2.1 */

// normalizeRequestConfig {*} -> {*}
const normalizeRequestConfig = (config) => {

  /* Add useful defaults for response_type (we know this is
  an Implicit Grant) and redirect_uri (we have the current
  browser location). */
  const obj = {
    response_type: 'token',
    redirect_uri: location.href
  }

  if (config.client_id) obj.client_id = config.client_id
  if (config.redirect_uri) obj.redirect_uri = config.redirect_uri
  if (config.state) obj.state = config.state
  if (config.scope) obj.scope = typeof config.scope === 'string' ? config.scope : config.scope.join('+')

  return obj
}



// requestCredentials :: {} -> undefined (window location is changed!)
const requestCredentials = (config) => (
  location.assign(
    uri((config.auth_uri),
    normalizeRequestConfig(config))
  ),
  undefined
)



export {
  requestCredentials as default
}
