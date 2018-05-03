// import history from '../history';
import auth0 from 'auth0-js';
// import { AUTH_CONFIG } from './auth0-variables';

const auth = new auth0.WebAuth({
  domain: 'clause.auth0.com',
  clientID: 'leqMbtzqy8xfy5Nq0SnzFkMQU3qctQAV',
  redirectUri: 'http://localhost:3000/callback',
  audience: 'https://clause.auth0.com/userinfo',
  responseType: 'token id_token',
  scope: 'openid'
});

class Auth {
  constructor() {

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    auth.authorize();
  }

  handleAuthentication() {
    auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        // history.replace('/home');
      } else if (err) {
        // history.replace('/home');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    // history.replace('/home');
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    // history.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  // This handler responds to the success or failure message that the pop-up dialog receives from the identity provider.
  // function processMessage(arg) {
  //     var messageFromPopupDialog = JSON.parse(arg.message);

  //     if (messageFromPopupDialog.outcome === "success") {

  //         // The Auth0 token has been received, so close the dialog, use
  //         // the token to get user information, and redirect the task
  //         // pane to the landing page.
  //         dialog.close();
  //         getUserData(messageFromPopupDialog.auth0Token);
  //         window.location.replace("/landing-page.html");
  //     } else {

  //         // Something went wrong with authentication or the authorization of the web application,
  //         // either with Auth0 or with the provider.
  //         dialog.close();
  //         app.showNotification("User authentication and application authorization",
  //                              "Unable to successfully authenticate user or authorize application: " + messageFromPopupDialog.error);
  //     }
  // }

  // // Use the Office dialog API to open a pop-up and display the sign-in page for choosing an identity provider.
  // function showLoginPopup() {

  //     // Create the popup URL and open it.
  //     var fullUrl = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/popup.html';

  //     // height and width are percentages of the size of the screen.
  //     Office.context.ui.displayDialogAsync(fullUrl,
  //             {height: 45, width: 55, requireHTTPS: true},
  //             function (result) {
  //                 dialog = result.value;
  //                 dialog.addEventHandler(Microsoft.Office.WebExtension.EventType.DialogMessageReceived, processMessage);
  //             });
  // }

  // function getUserData(auth0AccessToken) {
  //         try {

  //             // Use the token to get Auth0's standard userinfo object.
  //             var userInfoEndPoint = 'https://' + Auth0AccountData.subdomain + '.auth0.com/userinfo';
  //             var accessTokenParameter = '?access_token=' + auth0AccessToken;

  //             $.get(userInfoEndPoint + accessTokenParameter,
  //                function (data) { storeUserData(JSON.stringify(data)); }
  //             );
  //         }
  //         catch(err) {
  //             app.showNotification(err.message);
  //         }
  // }

  // function storeUserData(data) {

  //     // Store the data so it can be retrieved by the landing page.
  //     sessionStorage.removeItem('authOUserInfo');
  //     sessionStorage.setItem('authOUserInfo', data);
  // }


}

export default Auth;
