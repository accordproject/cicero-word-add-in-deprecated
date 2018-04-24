import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import BindingsList from './BindingsList';

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
        <AppBar position="static">
          <Toolbar>
            <IconButton aria-label="Menu" color="inherit">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              Smart Clauses
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
          <BindingsList/>
        </AppBar>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default withTheme()(ButtonAppBar);