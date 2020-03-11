import React, {Component} from 'react';
import List, { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import DescriptionIcon from '@material-ui/icons/Description';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { withTheme } from 'material-ui/styles'

import NewSmartClauseDialog from './NewSmartClauseDialog';

/**
 * Lists the existing smart clauses in the document and actions to:
 * <ul>
 *   <li>delete (remove the Office binding)
 *   <li>goto
 * </ul>
 */
class SmartClauseList extends Component {
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
                let text = asyncResult.value[i].id;
                let id = text;
                let template = '';
                const slashIndex = text.indexOf('/');
                if(slashIndex>0) {
                  template = text.substring(0,slashIndex);
                  id = text.substring(slashIndex+1);
                }
                newItems.push( {id: text, clauseId: id, templateId: template});
            }
            that.setState({items: newItems});
        }
        else {
            that.setState({message: 'Could not get bindings.'});
        }
    });
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
        <NewSmartClauseDialog callback={that.getBindings.bind(that)}/>
        <List component="nav">
          {this.state.items.map(function(item,index) {
            return (
              <ListItem button key={item.id} onClick={that.gotoBinding.bind(that, item.id)}>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText secondary={item.clauseId} primary={item.templateId}/>
              <ListItemSecondaryAction onClick={that.removeBinding.bind(that, item.id)}>
                <IconButton aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>);
          })}
        </List>
      </div>);
  }
}

export default withTheme()(SmartClauseList);
