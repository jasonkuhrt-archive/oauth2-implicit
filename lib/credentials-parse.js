import qs from 'qs'
import { asArray } from './utils'



const qsArrayFormat = (queryString) => (
  queryString.replace(/scope=(.+(?:\+.+)+)/, (match, p1) => (
    p1.split('+').map((a) => (`scope=${a}`)).join('&')
  ))
)



// parseCredentials :: String -> Credentials
const parseCredentials = (uriHash) => {
  // Parsing is based on the this spec:
  // http://tools.ietf.org/html/rfc6749#section-4.2.2

  const credentialsRead = qs.parse(qsArrayFormat(uriHash))

  // Validate required OAuth fields. These should be provided by the OAuth service.
  if (!credentialsRead.access_token) throw new Error('OAuth credentials parse error: Auth Server response is missing "access_token"')
  if (!credentialsRead.token_type) throw new Error('OAuth credentials parse error: Auth Server response is missing "token_type"')

  // Build up new credentials using JS ident conventions and default values
  const credentials = {}
  credentials.accessToken = credentialsRead.access_token
  credentials.tokenType = credentialsRead.token_type
  credentials.expiresIn = credentialsRead.expires_in || null
  credentials.scope = asArray(credentialsRead.scope)
  credentials.state = credentialsRead.state || null

  return credentials
}



export {
  parseCredentials as default
}
