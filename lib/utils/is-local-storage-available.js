// https://gist.github.com/paulirish/5558557
module.exports = (function isLocalStorageAvailable(){
  try {
    localStorage.setItem('is-local-storage-available', 1)
    localStorage.removeItem('is-local-storage-available')
    return true
  } catch(e) {
    return false
  }
})()