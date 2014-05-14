
// Spec for Implicit Grant:
// http://tools.ietf.org/html/rfc6749#section-4.2

'use strict';

var uri = require('./lib/utils/uri');
var get_credentials = require('./lib/credentials-get');


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

  function do_authorize(cb){
    var credentials = get_credentials(opts);
    if (credentials) return cb(null, credentials);
    location.assign(uri(opts.authorize_endpoint, qso));
  }

  return do_authorize;
}



module.exports = ImplicitGrant;

// Export utils for testing purposes
module.exports._get_credentials = get_credentials;
module.exports._parse_oauth_credentials = require('./lib/utils/parse-oauth-credentials');