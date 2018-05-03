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

    this.state = {
      auth: new Auth,
      user: null,
      githubRepo: null,
    };
  }

  componentDidMount() {
    this.login();
  }

  login() {
    this.state.auth.login();
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