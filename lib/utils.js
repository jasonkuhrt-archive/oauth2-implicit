
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

// qpSerialize :: {*} -> String
const qpSerialize = (xs) => (
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



// uri :: String, {...} -> String
const uri = (base, qpo) => (
  `${base}?${qpSerialize(qpo)}`
)



export {
  uri,
  clearLocationHash,
  tapValue,
  asArray,
}
