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
                            <h1 style={{align:"center"}}>Cicero Word Add-in</h1>
                            <img src={Logo} alt={props.title} title={props.title}/>
                            <h2>Please sideload your addin in Ms-word to see app body.</h2>
                            <CircularProgress style={{ marginLeft:"40%"}} color="primary" />
                            <h3><a href="https://docs.microsoft.com/en-us/office/dev/add-ins/testing/create-a-network-shared-folder-catalog-for-task-pane-and-content-add-ins">Sideload Office Add-ins</a></h3>
                        </div>
                  </Grid>
              </MuiThemeProvider>
        );
    }


export default withTheme()(Progress);
