import React, {Fragment} from 'react';
import TopNavigation from './TopNavigation';
import { MuiThemeProvider } from 'material-ui/styles';
import { withTheme } from 'material-ui/styles';
import Footer from './Footer';
/**
 * Root component for the app
 */
const App = (props) => {
    return (
        <MuiThemeProvider theme={props.theme}>
            <Fragment>
                <TopNavigation/>
                <Footer/>
            </Fragment>
        </MuiThemeProvider>
    );
};

export default withTheme()(App);
