import React from 'react';
import IconLabelTabs from './IconLabelTabs';

import { MuiThemeProvider } from 'material-ui/styles';
import { withTheme } from 'material-ui/styles'

class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    console.log('theme: ' + this.props.theme);
    return (
      <MuiThemeProvider theme={this.props.theme}>
      <div>
          <IconLabelTabs/>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default withTheme()(ButtonAppBar);