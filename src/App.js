import React, {Component, Fragment} from 'react';
import TopNavigation from './TopNavigation';
import { MuiThemeProvider } from 'material-ui/styles';
import { withTheme } from 'material-ui/styles'
import Progress from './Progress.js';


/**
 * Root component for the app
 */
class App extends Component {
  constructor(props) {
  super(props);
}
render() {
    const { title, isOfficeInitialized } = this.props;

    if (!isOfficeInitialized) {
      return (
        <Progress title={title} message="Please sideload your addin to see app body." />
      );
    }
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
