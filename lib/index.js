// Spec for Implicit Grant:
// http://tools.ietf.org/html/rfc6749#section-4.2

var uri = require('./utils/uri');
var get_credentials = require('./credentials-get');

module.exports = ImplicitGrant;



// ImplicitGrant :: {} -> (err, credentials -> void) -> void
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
    // TODO remove support for authorize_endpoint
    location.assign(uri(opts.authorize_endpoint || opts.auth_uri, qso));
  }

  do_authorize.localCredentials = get_credentials.bind(null, opts);

  return do_authorize;
}



// Export utils for testing purposes
module.exports._get_credentials = get_credentials;
module.exports._parse_oauth_credentials = require('./utils/parse-oauth-credentials');