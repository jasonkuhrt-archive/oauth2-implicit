import qs from 'qs'
import { asArray } from './utils'



const qsArrayFormat = (queryString) => (
  queryString.replace(/scope=(.+(?:\+.+)+)/, (match, p1) => (
    p1.split('+').map((a) => (`scope=${a}`)).join('&')
  ))
)

const ErrorNoAccessToken = () => (
  new Error(
    `OAuth credentials parse error: \
    Auth Server response is missing "access_token"`
  )
)

const ErrorNoTokenType = () => (
  new Error(
    `OAuth credentials parse error: \
    Auth Server response is missing "token_type"`
  )
)



/* Parse and validate the Implicit Grant information returned
by an Authorization Service. Parser is
based on spec: http://tools.ietf.org/html/rfc6749#section-4.2.2 */

// parse :: String -> ParsedCredentials
const parse = (uriHash) => {
  const data = qs.parse(qsArrayFormat(uriHash))
  if (!data.access_token) throw ErrorNoAccessToken()
  if (!data.token_type) throw ErrorNoTokenType()
  return data
}



// process :: ParsedCredentials -> Credentials
const process = (parsedCredentials) => ({
  accessToken: parsedCredentials.access_token,
  tokenType: parsedCredentials.token_type,
  expiresIn: parsedCredentials.expires_in || null,
  scope: asArray(parsedCredentials.scope),
  state: parsedCredentials.state || null,
})



// parseCredentials :: String -> Credentials
const parseCredentials = (uriHash) => (
  process(parse(uriHash))
)



export {
  parseCredentials as default
}
