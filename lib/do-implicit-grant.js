// Spec for Implicit Grant:
// http://tools.ietf.org/html/rfc6749#section-4.2

var get_credentials = require('./credentials-get')
var create_oauth_request_uri = require('./create-oauth-request-uri')



// ImplicitGrant :: {} -> (err, credentials -> void) -> void

module.exports = function do_implicit_grant(opts){
  function do_authorize(){
    return get_credentials(opts) || location.assign(create_oauth_request_uri(opts))
  }
  return do_authorize
}