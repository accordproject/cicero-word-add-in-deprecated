import React, { Component } from 'react';
import Spinner from 'react-spinner-material';
import Logo from './assets/logo-filled.png';
import { MuiThemeProvider } from 'material-ui/styles';
import { withTheme } from 'material-ui/styles'
class Progress extends Component {
    render() {
      const { title } = this.props;
        return (
          <MuiThemeProvider theme={this.props.theme}>
                <div className="spinner">
                    <img width="20%"  src={Logo} alt={title} title={title}/>
                    <Spinner radius={50} color={"#333"} stroke={3} visible={true} />
                    <h2>Please sideload your addin to see app body.</h2>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withTheme()(Progress);
