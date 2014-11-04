// request :: {} -> void (window location is changed!)

module.exports = function do_implicit_grant(opts) {
  return location.assign(create_oauth_request_uri(opts))
}



function create_oauth_request_uri(opts) {
  return uri((opts.auth_uri), queryObject(opts))
}



// Spec for access_token request params:
// http://tools.ietf.org/html/rfc6749#section-4.2.1

function queryObject(opts) {
  var obj = {
    response_type: 'token',
    redirect_uri: location.href
  }

  if (opts.client_id)     obj.client_id = opts.client_id
  if (opts.redirect_uri)  obj.redirect_uri = opts.redirect_uri
  if (opts.scope)         obj.scope = typeof opts.scope === 'string' ? opts.scope : opts.scope.join('+')
  if (opts.state)         obj.state = opts.state

  return obj
}



// uri :: String, {...} -> String

function uri(base, qpo){
  return base + '?' + qp_serialize(qpo);
}



// qp_serialize :: {...} -> String

function qp_serialize(o){
  var a = [];
  for (var k in o) {
    if (!o.hasOwnProperty(k)) continue;
    a.push(k + '=' + o[k]);
  }
  var str = a.join('&');
  return str;
}
