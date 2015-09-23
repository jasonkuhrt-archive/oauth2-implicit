


exports.tapValue = function tapValue (v, tapper) {
  tapper(v); return v
}



/*

  clearLocationHash :: -> null

*/
exports.clearLocationHash = function clearLocationHash () {
  if (history && history.replaceState) {
    window.history.replaceState(null, null, window.location.href.replace(/#.*$/,''))
  } else {
    window.location.hash = ''
  }
  return null
}



// uri :: String, {...} -> String

exports.uri = function uri (base, qpo) {
  return base + '?' + qpSerialize(qpo)
}


// qpSerialize :: {...} -> String

function qpSerialize (o) {
  var a = []
  for (var k in o) {
    if (!o.hasOwnProperty(k)) continue
    a.push(k + '=' + o[k])
  }
  var str = a.join('&')
  return str
}
