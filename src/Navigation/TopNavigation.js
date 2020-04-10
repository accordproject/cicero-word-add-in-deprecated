import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import NoteIcon from '@material-ui/icons/Note';
import CodeIcon from '@material-ui/icons/Code';
import SmartClauseList from '../ClauseEditor/SmartClauseList';
import TemplateList from '../TemplateEditor/TemplateList';
import {ReactComponent as Logo} from '../assets/CICERO-WHITE-ON-TRANSPARANT-LOGOTYPE.svg';


function TabContainer(props) {
    const { value, index } = props;
    return (
        value === index ? <Typography component="div" style={{padding: 8*3}}>
            {props.children }
        </Typography> : null
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    appbar: {
        alignItems: 'center',
        paddingTop: '5%',
        paddingBottom: '5%',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    tabsContainerItem: {
        flex: 1
    }
});

/**
 * Manages the tabs across the top of the application
 */
const  TopNavigation = ({ classes }) => {

    const [value, setValue] = useState(0);
    const handleChange = (event, value) => {
        setValue( value );
    };


    return (
        <div className={classes.root}>
          <div className="container">
            <AppBar position="static" className={classes.appbar}>
              <Logo className="logo"/> 
              <div>Word Add in</div>
            </AppBar>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} fullWidth>
                    <Tab label="Clause Template" icon={<NoteIcon />} />
                    <Tab label="Templates" icon={<CodeIcon />} />
                </Tabs>
            </AppBar>
          </div>
          <TabContainer value={value} index={0}><SmartClauseList/></TabContainer>
          <TabContainer value={value} index={1}><TemplateList/></TabContainer>
        </div>
    );
};

TopNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopNavigation);
