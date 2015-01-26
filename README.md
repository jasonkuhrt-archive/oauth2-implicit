# oauth2-implicit [![Circle CI](https://circleci.com/gh/jasonkuhrt/oauth2-implicit.svg?style=svg)](https://circleci.com/gh/jasonkuhrt/oauth2-implicit)
A minimal oauth2-spec-based client utility for traveling through the OAuth2 Implicit Grant flow

This library is designed against the [Implicit Grant flow as specified in the OAuth2 specification RFC 6749](http://tools.ietf.org/html/rfc6749#section-4.2)



## Installation

    npm --save install oauth2-implicit



## API

#### implicitGrant()

    implicitGrant :: Options -> Credentials

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


### .requestCredentials()

    requestCredentials :: Options -> null

Make a fresh token request to the authorization server. Note that this function ***does not read the result following redirect***, so your application still needs to use either `implicitGrant()` or `.readCredentials()`. This function is useful if, for example, your app makes some API call to a Resource Server that returns an Authorization Server (AS) error ("invalid token" or "expired token") and you need to make a fresh request to get credentials from said AS.

##### `Options :: {}`
  See `Options` docs for `implicitGrant`.



### .readCredentials()

    readCredentials :: -> Credentials | null

Try clear the credentials from the URI Hash and return them as [`Credentials`](#credentials). If no credentials are found `null` is returned.


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



## Test

    testem
