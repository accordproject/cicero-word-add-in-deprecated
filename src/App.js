import React, { Fragment} from 'react';
import TopNavigation from './TopNavigation';
import { MuiThemeProvider } from 'material-ui/styles';
import { withTheme } from 'material-ui/styles'
import Progress from './Progress.js';


/**
 * Root component for the app
 */
const App = props => {
    if (!props.isOfficeInitialized) {
      return (
        <Progress title={props.title}  />
      );
    }
    return (
      <MuiThemeProvider theme={props.theme}>
        <Fragment>
          <TopNavigation/>
        </Fragment>
      </MuiThemeProvider>
    );
}


export default withTheme()(App);
