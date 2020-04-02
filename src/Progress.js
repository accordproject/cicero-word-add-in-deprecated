import React from 'react';
import Logo from './assets/logo-filled.png';
import { MuiThemeProvider } from 'material-ui/styles';
import { withTheme } from 'material-ui/styles'
import {Grid, CircularProgress} from '@material-ui/core/';

const Progress = (props) => {
        return (
              <MuiThemeProvider theme={props.theme}>
                  <Grid container direction="row" justify="center" alignItems="center">
                        <div>
                            <h1 className='loading-screen-header'>Cicero Word Add-in</h1>
                            <img src={Logo} alt={props.title} title={props.title}/>
                            <h2>Please <a href="https://docs.microsoft.com/en-us/office/dev/add-ins/testing/create-a-network-shared-folder-catalog-for-task-pane-and-content-add-ins">sideload your add-in</a> in Ms-word to see app body.</h2>
                            <CircularProgress className='loading-screen-circular-progress' color="primary" />
                        </div>
                  </Grid>
              </MuiThemeProvider>
        );
    }


export default withTheme()(Progress);
