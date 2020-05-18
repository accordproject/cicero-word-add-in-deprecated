import { UserAgentApplication } from 'msal';

export default new UserAgentApplication({
  auth: {
    clientId: process.env.REACT_APP_MICROSOFT_CLIENT_ID,
    redirectUri: process.env.REACT_APP_REDIRECT_URI,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: true,
  },
})
