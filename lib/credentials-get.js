'use strict';

var cache = require('./credentials-cache');
var clear_hash = require('./location-hash-clear');
var qpp = require('./uri-query-params-parse');



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



// TODO this should patch missing fields with null so that the keys are constants
// Spec: http://tools.ietf.org/html/rfc6749#section-4.2.2

// parse_oauth_credentials :: String -> {}
function parse_oauth_credentials(uri_hash){
  return qpp(uri_hash);
}


module.exports = get_credentials;