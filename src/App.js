import React from 'react';

// import auth0 from 'auth0-js';

import Auth from './util/Auth';
// import TopNavigation from './TopNavigation';

/**
 * Root component for the app
 */
class App extends React.Component {
  constructor(props) {
    super(props);

    var Auth0AccountData = Auth0AccountData || {};

    // Replace the placeholders in the next two lines.
    Auth0AccountData.subdomain = '{Auth0 account subdomain}';
    Auth0AccountData.clientID = '{Auth0 client ID}';

    // The Auth0 subdomain and client ID need to be shared with the popup dialog
    localStorage.setItem('Auth0Subdomain', Auth0AccountData.subdomain);
    localStorage.setItem('Auth0ClientID', Auth0AccountData.clientID);

    var dialog;


    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.processMessage = this.processMessage.bind(this);

    this.state = {
      auth: new Auth,
      user: null,
      githubRepo: null,
    };
  }

  // componentDidMount() {
  //   // Use the Office dialog API to open a pop-up and display the sign-in page for choosing an identity provider.
  //   this.login();
  // }

  login() {
    // this.state.auth.login();
    // Create the popup URL and open it.
    var fullUrl = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/login.html';

    // height and width are percentages of the size of the screen.
    window.Office.context.ui.displayDialogAsync(
      fullUrl,
      {height: 45, width: 55, requireHTTPS: true},
      function (result) {
        dialog = result.value;
        dialog.addEventHandler(window.Office.WebExtension.EventType.DialogMessageReceived, this.processMessage);
      });
  }

  // This handler responds to the success or failure message that the pop-up dialog receives from the identity provider.
  processMessage(arg) {
    const messageFromPopupDialog = JSON.parse(arg.message);

    if (messageFromPopupDialog.outcome === 'success') {

      // The Auth0 token has been received, so close the dialog, use
      // the token to get user information, and redirect the task
      // pane to the landing page.
      dialog.close();
      getUserData(messageFromPopupDialog.auth0Token);
      window.location.replace('/landing-page.html');
    } else {

      // Something went wrong with authentication or the authorization of the web application,
      // either with Auth0 or with the provider.
      dialog.close();
      app.showNotification(
        'User authentication and application authorization',
        'Unable to successfully authenticate user or authorize application: ' + messageFromPopupDialog.error
      );
    }
  }

  getUserData(auth0AccessToken) {
    try {
      // Use the token to get Auth0's standard userinfo object.
      var userInfoEndPoint = 'https://' + Auth0AccountData.subdomain + '.auth0.com/userinfo';
      var accessTokenParameter = '?access_token=' + auth0AccessToken;

      $.get(userInfoEndPoint + accessTokenParameter,
        function (data) { storeUserData(JSON.stringify(data)); }
      );
    }
    catch(err) {
      app.showNotification(err.message);
    }
  }

  logout() {
    this.state.auth.logout();
  }

  render() {
    return (
      <div className="app">
        This is app
      </div>
    );
  }
}

export default App;