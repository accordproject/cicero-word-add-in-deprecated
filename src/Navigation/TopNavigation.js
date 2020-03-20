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


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
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
    position: 'sticky',
    top: '0px'
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
      <AppBar position="static" className={classes.appbar}>
        Cicero Word Add In
      </AppBar>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} fullWidth>
            <Tab label="Clause Template" icon={<NoteIcon />} />
            <Tab label="Templates" icon={<CodeIcon />} />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><SmartClauseList/></TabContainer>}
        {value === 1 && <TabContainer><TemplateList/></TabContainer>}
      </div>
    );
}

TopNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopNavigation);
