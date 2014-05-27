# global afterEach, beforeEach, expect, describe, it
O2I = require('oauth2-implicit')


describe 'oauth2-implicit', ->
  o2i = undefined

  beforeEach ->
    console.log(O2I)
    o2i = O2I(client_id: 'foo-id')

  afterEach ->
    localStorage.clear()

  it 'exports a factory', ->
    console.log(a)
    a.typeOf O2I(client_id: 'foobar'), 'function'