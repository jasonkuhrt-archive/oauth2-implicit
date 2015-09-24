
const asArray = (a) => (
  typeof a === 'undefined' || a === null
    ? []
  : Array.isArray(a)
    ? a
    : [a]
)


const tapValue = (v, tapper) => (
  tapper(v), v
)


// qsKeyValue :: String, String -> String
const qsKeyValue = (k, v) => (
  `${k}=${v}`
)

// querySerialize :: {*} -> String
const querySerialize = (xs) => (
  Object
  .keys(xs)
  .reduce(
    ((qs, x) => (
      qs.concat([qsKeyValue(x, xs[x])])
    )),
    []
  )
  .join('&')
)



// clearLocationHash :: -> null
const clearLocationHash = () => {
  if (history && history.replaceState) {
    window.history.replaceState(null, null, window.location.href.replace(/#.*$/,''))
  } else {
    window.location.hash = ''
  }
  return null
}



// formatURI :: { origin :: String, query :: {*} } -> String
const formatURI = ({ origin, query }) => (
  `${origin}?${querySerialize(query)}`
)



export {
  formatURI,
  clearLocationHash,
  tapValue,
  asArray
}
