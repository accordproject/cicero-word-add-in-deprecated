import React, {Component, Fragment} from 'react';
import TopNavigation from './TopNavigation';

import { MuiThemeProvider } from 'material-ui/styles';
import { withTheme } from 'material-ui/styles'

/**
 * Root component for the app
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <MuiThemeProvider theme={this.props.theme}>
        <Fragment>
          <TopNavigation/>
        </Fragment>
      </MuiThemeProvider>
    );
  }
}

export default withTheme()(App);
