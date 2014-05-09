'use strict';



// strip_redirect_credentials :: -> null

function strip_redirect_credentials(){
  if (history && history.replaceState) {
    window.history.replaceState(null, null, window.location.href.replace(/#.*$/,''));
  } else {
    window.location.hash = '';
  }
  return null;
}



module.exports = strip_redirect_credentials;