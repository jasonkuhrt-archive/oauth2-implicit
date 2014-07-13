var cache = require('./credentials-cache')
var parse_oauth_credentials = require('./credentials-parse')
var clear_hash = require('./utils/location-hash-clear')

module.exports = get_credentials



// get_credentials :: -> {} || null

function get_credentials(request_opts){
  var cache_id = JSON.stringify(request_opts)
  var creds

  if (is_oauth_redirect(location.hash)) {
    creds = extract_credentials(location.hash.slice(1))
    cache.set(
      creds,
      cache_id,
      (creds.expiresIn ? ( Date.now() + creds.expiresIn ) : null)
    )
    return creds
  }

  creds = cache.get(cache_id)
  if (creds) return creds

  return null
}



// is_oauth_redirect :: String -> Bool

function is_oauth_redirect(uri_hash){
  return !!~uri_hash.indexOf('#access_token')
}




// This function mutates location to remove the retrieved credentials

// extract_credentials :: -> {} || null

function extract_credentials(uri_hash){
  var creds = parse_oauth_credentials(uri_hash)
  clear_hash()
  return creds
}