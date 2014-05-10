
// Spec for Implicit Grant:
// http://tools.ietf.org/html/rfc6749#section-4.2

'use strict';

var uri = require('./lib/uri');
var get_credentials = require('./lib/get-credentials');


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



module.exports = ImplicitGrant;
module.exports._get_credentials = get_credentials;