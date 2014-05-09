
// Spec for Implicit Grant:
// http://tools.ietf.org/html/rfc6749#section-4.2

'use strict';

var cache = require('./lib/cache');
var uri = require('./lib/uri');
var clear_hash = require('./lib/hash-clear');
var qpp = require('./lib/query-params-parse');



// ImplicitGrant :: {} -> ((err, credentials -> void) -> void)
function ImplicitGrant(opts){

  // Spec for access_token request params:
  // http://tools.ietf.org/html/rfc6749#section-4.2.1

  var qso = {
    response_type: 'token',
    redirect_uri: location.href
  };

  if (opts.client_id)     qso.client_id = opts.client_id;
  if (opts.redirect_uri)  qso.redirect_uri = opts.redirect_uri;
  if (opts.scope)         qso.scope = typeof opts.scope === 'string' ? opts.scope : opts.scope.join('+');
  if (opts.state)         qso.state = opts.state;

  function doAuthorize(cb){
    var credentials = get_credentials();
    if (credentials) return cb(null, credentials);
    location.assign(uri(opts.authorize_endpoint, qso));
  }

  return doAuthorize;
}



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



module.exports = ImplicitGrant;