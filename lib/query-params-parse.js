'use strict';



function qp_parse(uri_hash){
  return uri_hash
    .split('&')
    .map(function(x){
      return x.split('=');
    })
    .reduce(function(o, pair){
      o[pair[0]] = pair[1];
      return o;
    }, {});
}



module.exports = qp_parse;