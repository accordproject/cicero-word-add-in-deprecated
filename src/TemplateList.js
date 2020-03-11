import React, {Component} from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import DescriptionIcon from '@material-ui/icons/Description';
import { withTheme } from 'material-ui/styles'

import NewTemplateDialog from './NewTemplateDialog';

/**
 * Lists the templates in a template library
 */
class TemplateList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      templates: [],
      message: ''
    }
  }

  componentDidMount() {
    this.getTemplates();
  }

  getTemplates() {
    const newItems = [];
    newItems.push( {id: 'org.accordproject.foo', description: 'This is a test template'});
    newItems.push( {id: 'org.accordproject.bar', description: 'This is another test template'});
    this.setState({templates: newItems});
  }

  render() {
    const that = this;
    return (
      <div className={this.props.theme.palette.background.paper}>
        <NewTemplateDialog callback={that.getTemplates.bind(that)}/>
        <List component="nav">
          {this.state.templates.map(function(item,index) {
            return (
              <ListItem button key={item.id}>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText secondary={item.description} primary={item.id}/>
            </ListItem>);
          })}
        </List>
      </div>);
  }
}

export default withTheme()(TemplateList);
