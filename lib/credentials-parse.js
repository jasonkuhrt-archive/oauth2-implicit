import qs from 'qs'



const base64Decode = window.atob

const deserializeState = (string) => (
  JSON.parse(base64Decode(string))
)

const ErrorNoAccessToken = () => (
  new Error(
    `OAuth credentials parse error: \
    Auth Server response is missing "access_token"`
  )
)

const ErrorNoTokenType = () => (
  new Error(
    `OAuth Credentials parse error: \
    Auth Server response is missing "token_type"`
  )
)

const ErrorStateParse = ({ message }) => (
  new Error(
    `OAuth Credentials parse error: \
    Failed to parse state: ${message}`
  )
)



/* Parse and validate the Implicit Grant information returned
by an Authorization Service. Parser is
based on spec: http://tools.ietf.org/html/rfc6749#section-4.2.2 */

// parse :: String -> ParsedCredentials
const parse = (uriHash) => {
  const data = qs.parse(uriHash)


  if (!data.access_token) throw ErrorNoAccessToken()
  if (!data.token_type) throw ErrorNoTokenType()

  if (data.state) {
    try {
      data.state = deserializeState(data.state)
    } catch (e) {
      throw ErrorStateParse(e)
    }
  } else {
    data.state = {}
  }

  if (!data.expires_in) {
    data.expires_in = null
  }

  data.scope = data.scope
    ? data.scope.split(' ')
    : []

  return data
}



// camelCaseifyKeys :: ParsedCredentials -> Credentials
const camelCaseifyKeys = (parsedCredentials) => ({
  accessToken: parsedCredentials.access_token,
  tokenType: parsedCredentials.token_type,
  expiresIn: parsedCredentials.expires_in,
  scope: parsedCredentials.scope,
  state: parsedCredentials.state
})



// parseCredentials :: String -> Credentials
const parseCredentials = (uriHash) => (
  camelCaseifyKeys(parse(uriHash))
)



export {
  parseCredentials as default
}
