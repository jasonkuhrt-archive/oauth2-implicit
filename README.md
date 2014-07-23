# oauth2-implicit

A minimal oauth2-spec-based client utility for traveling through the OAuth2 Implicit Grant flow

This library is designed against the [Implicit Grant flow as specified in the OAuth2 specification RFC 6749](http://tools.ietf.org/html/rfc6749#section-4.2)



## Installation

    component install jasonkuhrt/oauth2-implicit



## API

#### ImplicitGrant()

    ImplicitGrant :: Options -> Credentials

##### `Options :: {}`
Minimal configuration of the Implicit Grant flow. Fields:
  - **`auth_uri :: String`**  
  The URI that the Implicit Grant Flow will run against. In OAuth2 parlance this URI points to the Authorization Server.
  - **`client_id :: String`**  
  The client_id to make the OAuth request with. You should attain this from the Authorization Server during Application Registration time.
  - **`scope :: String | Array`**  
  The scope that app will use in its request to Authorization Server. If `Array` type used scopes will be joined by `+` into a `String`. Authorization servers should accept this format (DoorKeeper ruby does). Please open an issue if you discover otherwise.
  - **`state :: String` `?`**  
  Optional data that the Authorization Server will return to the redirect_uri. Learn more here http://tools.ietf.org/html/rfc6749#section-4.1.1.
  - **`redirect_uri :: String`  `?`**  
  Optional redirect_uri that the Authorization Server should send the user back to. If provided this must match a redirect_uri that was provided to the Authorization Server during Application Registration time. Since multiple uri_redirects can be registered, presumably the client request can dynamically choose which one to use at runtime.

##### `Credentials :: {}`
Credentials extracted from the URI hash as put there by the Authorization Server redirection process. [Fields](#credentials).


### .getCredentials()

    Credentials :: -> Credentials | null

Try clear the credentials from the URI Hash and return them as [`Credentials`](#credentials). Extracted credentials are cached into local storage, overwritting any previous cache. Cache is only accessed when URI Hash does not contain credentials. If no credentials are found `null` is returned.


### .parseCredentials()

    parseCredentials :: String:URIHash -> Credentials

Convert String URI Hash credentials into structured [`Credentials`](#credentials).



## Types

##### `Credentials`

    accessToken :: String
    tokenType   :: String
    expiresIn   :: Number | null
    scope       :: [String]
    state       :: String | null

## NOTES

- `localStorage` is used to cache `credentials`. The benefit of this is that we avoid some network IO: A redirect to the Authorization Server and another back to the client app. Rest assured the cache is discarded if the `credentials`' `expiresIn` has been recahed (internally stored as `expiresAt`).


## Test

    testem
