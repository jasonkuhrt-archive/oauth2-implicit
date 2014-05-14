'use strict';

var store = require('store');



var cache_key = 'oauth_credentials';



function set_cache(data, id, expiresAt){
  var data_envelope = {
    data: data,
    id: id,
    expiresAt: expiresAt
  };
  store(cache_key, data_envelope);
  return null;
}



function get_cache(id){
  var data = store(cache_key);

  if (!data) return null;

  // If cache does not pass id
  // match test then return null.
  // This is a way of ensuring cache
  // is only returned for correct requests.
  if (data.id !== id) {
    return bust_cache(cache_key);
  }

  // Cache is considered invalid if Date.now() has
  // surpassed expiresAt.
  // If expiresAt === null, it never expires.
  if (data.expiresAt && data.expiresAt < Date.now()) {
    return bust_cache(cache_key);
  }

  return data.data;
}



// Helpers

function bust_cache(key){
  store(key, null); // returns undefined which we don't want
  return null;
}



exports.set = set_cache;
exports.get = get_cache;