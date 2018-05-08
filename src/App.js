import React from 'react';

// import auth0 from 'auth0-js';
import { Button, Segment } from 'semantic-ui-react';

import Auth from './util/Auth';
// import TopNavigation from './TopNavigation';

/**
 * Root component for the app
 */
class App extends React.Component {
  constructor(props) {
    super(props);

    this.auth = new Auth();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      user: null,
      githubRepo: null,
    };
  }

  componentDidMount() {
    this.login();
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.state.auth.logout();
  }

  render() {
    return (
      <div className="app">
        <Segment>
          <Button onClick={this.login} className="loginBtn">
            Log in to GitHub
          </Button>
        </Segment>
      </div>
    );
  }
}

export default App;