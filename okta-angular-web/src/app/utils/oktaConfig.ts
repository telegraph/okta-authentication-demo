export const clientConfig = {
 baseUrl: 'https://dev-554909.oktapreview.com',
 host: 'http://localhost',
 clientPort: 4200,
 clientId: '0oajcs9cb5CQvytKU0h7',
 //clientSecret: ''
}

export const oktaConfig = {
  issuer: clientConfig.baseUrl + '/oauth2/default',
  clientId: '0oajcs9cb5CQvytKU0h7',
  redirectUri: clientConfig.host + ":" + clientConfig.clientPort + '/implicit/callback',
  scope: 'openid profile email'
}

export const oktaApiUrls = {
  messagesUrl: clientConfig.baseUrl + '/api/messages',
  meUrl: clientConfig.baseUrl + '/api/v1/users/me/',
  myGroupsUrl: clientConfig.baseUrl + '/api/v1/users/me/groups',
  tokenUrl: clientConfig.baseUrl + '/oauth2/default/v1/token',
  authorizationUrl: clientConfig.baseUrl + '/oauth2/default/v1/authorize',
  trustedOrigins: clientConfig.baseUrl + '/api/v1/trustedOrigins',
  redirectUri: oktaConfig.redirectUri,
}