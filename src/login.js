// Copyright (c) Accord Project. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.

(function () {
  'use strict';
  console.log('login.js init');

  try {

    // Redirect to Auth0 and tell it which provider to use.
    var auth0AuthorizeEndPoint = 'https://' + localStorage.getItem('Auth0Subdomain') + '.auth0.com/authorize/';
    console.log('login.js');

    document.addEventListener('DOMContentLoaded', function() {
      console.log('DOMContentLoaded');
      // $("#facebookButton").click(function () {
      //   console.log("facebook clicked" + auth0AuthorizeEndPoint);
      //   redirectToIdentityProvider('facebook');
      // });

      // $("#googleButton").click(function () {
      //   redirectToIdentityProvider('google-oauth2');
      // });

      // $("#msAccountButton").click(function () {
      //   redirectToIdentityProvider('windowslive');
      // });

      window.location.replace(auth0AuthorizeEndPoint
        + '?'
        + 'response_type=token'
        + '&client_id=' + localStorage.getItem('Auth0ClientID')
        + '&redirect_uri=https://localhost:3000/loginCallback.html'
        + '&scope=openid'
        + '&connection=github');
    });
  }
  catch(err) {
    console.log(err.message);
  }
}());
