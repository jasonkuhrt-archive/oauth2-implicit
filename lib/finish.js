import parseOauthCredentials from './credentials-parse'
import { tapValue, clearLocationHash } from './utils'



// isOauthRedirect :: String -> Bool
const isOauthRedirect = (hashString) => (
  hashString.indexOf('#access_token') !== -1
)



/* This function mutates location to remove
the retrieved credentials */

// extractCredentials :: String -> {} || null
const extractCredentials = (hash) => (
  tapValue(
    parseOauthCredentials(hash),
    clearLocationHash
  )
)



// start :: -> {} || null
const start = () => (
  isOauthRedirect(location.hash)
    ? extractCredentials(location.hash.slice(1))
    : null
)



export {
  start as default
}
