import React, {Fragment} from 'react';
import TopNavigation from './TopNavigation';
import { MuiThemeProvider } from 'material-ui/styles';
import { withTheme } from 'material-ui/styles'

/**
 * Root component for the app
 */
const App = () => {
    return (
      <MuiThemeProvider>
        <Fragment>
          <TopNavigation/>
        </Fragment>
      </MuiThemeProvider>
    );
}

export default withTheme()(App);
