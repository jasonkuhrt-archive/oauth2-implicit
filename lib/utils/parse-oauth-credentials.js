'use strict';

var qpp = require('./uri-query-params-parse');



// parse_oauth_credentials :: String -> {}

function parse_oauth_credentials(uri_hash){
  // Parsing is based on the this spec:
  // http://tools.ietf.org/html/rfc6749#section-4.2.2

  var creds_received = qpp(uri_hash);

  // Validate required OAuth fields. These should be provided by the OAuth service.
  if (!creds_received.access_token) throw new Error('OAuth credentials parse error: Auth Server response is missing "access_token"');
  if (!creds_received.token_type) throw new Error('OAuth credentials parse error: Auth Server response is missing "token_type"');

  // Build up new credentials using JS ident conventions and default values
  var creds_return = {};
  creds_return.accessToken = creds_received.access_token;
  creds_return.tokenType = creds_received.token_type;
  creds_return.expiresIn = creds_received.expires_in || null;
  creds_return.scope = creds_received.scope ? creds_received.scope.split('+') : [];
  creds_return.state = creds_received.state || null;

  return creds_return;
}


module.exports = parse_oauth_credentials;