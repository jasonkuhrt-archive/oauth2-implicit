


exports.tapValue = function tapValue(v, tapper) {
  tapper(v); return v
}



// https://gist.github.com/paulirish/5558557
exports.isLocalStorageAvailable = (function isLocalStorageAvailable(){
  try {
    localStorage.setItem('is-local-storage-available', 1)
    localStorage.removeItem('is-local-storage-available')
    return true
  } catch(e) {
    return false
  }
})()



/*

  clearLocationHash :: -> null

*/
exports.clearLocationHash = function clearLocationHash() {
  if (history && history.replaceState) {
    window.history.replaceState(null, null, window.location.href.replace(/#.*$/,''))
  } else {
    window.location.hash = ''
  }
  return null
}
