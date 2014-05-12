'use strict';

var cache = require('./credentials-cache');
var clear_hash = require('./utils/location-hash-clear');
var parse_oauth_credentials = require('./utils/parse-oauth-credentials');



// get_credentials :: -> {} || null
function get_credentials(){
  if (is_oauth_redirect(location.hash)) return extract_credentials(location.hash.slice(1));
  if (cache()) return cache();
  return null;
}



// is_oauth_redirect :: String -> Bool
function is_oauth_redirect(uri_hash){
  return !!~uri_hash.indexOf('#access_token');
}




// This function mutates location to remove the retrieved credentials

// extract_credentials :: -> {} || null
function extract_credentials(uri_hash){
  var credentials = parse_oauth_credentials(uri_hash);
  clear_hash();
  cache(credentials);
  return credentials;
}







module.exports = get_credentials;