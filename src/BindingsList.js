import React from 'react';
import PropTypes from 'prop-types';
import List, { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import DescriptionIcon from '@material-ui/icons/Description';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { withTheme } from 'material-ui/styles'

import BindDialog from './BindDialog';

/**
 * Displays a list of the existing bindings in the document and allows a binding to be removed.
 */
class BindingsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      message: ''
    }
  }

  componentDidMount() {
    this.getBindings();
  }

  getBindings() {
      const that = this;
      window.Office.context.document.bindings.getAllAsync(function (asyncResult) {
        if(asyncResult) {
            const newItems = [];

            for (var i in asyncResult.value) {
                const id = asyncResult.value[i].id;
                newItems.push( {id: id, description: asyncResult.value[i].type});
            }
            that.setState({items: newItems});
        }
        else {
            that.setState({message: 'Could not get bindings.'});
        }
    });

//    this.setState({items: [{id: '1', description: 'text'}]});
  }

  removeBinding(id) {
    const that = this;
    window.Office.context.document.bindings.releaseByIdAsync(id, function (asyncResult) { 
      that.getBindings();
    });  
  };

  gotoBinding(id) {
    window.Office.context.document.goToByIdAsync(id, window.Office.GoToType.Binding);
  };

  render() {
    const that = this;
    return (
      <div className={this.props.theme.palette.background.paper}>
        <List component="nav">
          {this.state.items.map(function(item,index) {
            return (
              <ListItem button key={item.id} onClick={that.gotoBinding.bind(that, item.id)}>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary={item.id} secondary={item.description}/>
              <ListItemSecondaryAction onClick={that.removeBinding.bind(that, item.id)}>
                <IconButton aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>);
          })}
        </List>
        <BindDialog callback={that.getBindings.bind(that)}/>
      </div>);
  }
}

export default withTheme()(BindingsList);