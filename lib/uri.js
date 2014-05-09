'use strict';



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


module.exports = uri;