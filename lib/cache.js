'use strict';

var store = require('store');






var cache_key = 'oauth_credentials';


function cache(credentials){
  if (credentials) return set_cache(credentials);
  return get_cache();
}



function set_cache(credentials){
  var data_envelope = {
    credentials: credentials
  };
  data_envelope.expires_at = credentials.expires_in ? ( Date.now() + credentials.expires_in ) : null ;
  store(cache_key, data_envelope);
  return null;
}



function get_cache(){
  var data = store(cache_key);
  if (!data) return null;

  // Cache is considered invalid if Date.now() has
  // surpassed expires_at.
  // If expires_at === null, it never expires.
  if (data.expires_at && data.expires_at < Date.now()) {
    store(cache_key, null);
    return null;
  }

  return data.credentials;
}



module.exports = cache;