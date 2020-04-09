import React, {useState, useEffect} from 'react';
import List, { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import DescriptionIcon from '@material-ui/icons/Description';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { withTheme } from 'material-ui/styles';
import NewSmartClauseDialog from './NewSmartClauseDialog';
import PropTypes from 'prop-types';

/**
 * Lists the existing smart clauses in the document and actions to:
 * <ul>
 *   <li>delete (remove the Office binding)
 *   <li>goto
 * </ul>
 */
const SmartClauseList = (props) => {

    const [items, setItems] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
      getBindings();
    }, [])

  const getBindings = () => {
      const bindings = window.Office.context.document.bindings;
      bindings.getAllAsync((asyncResult) => {
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
              setItems(newItems);
        }
        else {
              setMessage('Could not get bindings.');
        }
    });
  }

  const removeBinding = (id) => {
    const bindings = window.Office.context.document.bindings
    bindings.releaseByIdAsync(id, (asyncResult) => {
      getBindings();
    });
  };

  const gotoBinding = (id) => {
      const document = window.Office.context.document;
      document.goToByIdAsync(id, window.Office.GoToType.Binding);
  };

    return (
      <div className={props.theme.palette.background.paper}>
        <NewSmartClauseDialog callback={getBindings}/>
        <List component="nav">
          {items.map((item,index) => {
            return (
              <ListItem button key={item.id} onClick={() => gotoBinding(item.id)}>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText secondary={item.clauseId} primary={item.templateId}/>
              <ListItemSecondaryAction onClick={() => removeBinding(item.id)}>
                <IconButton aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>);
          })}
        </List>
      </div>);
  }

  SmartClauseList.propTypes = {
    theme: PropTypes.object.isRequired
};

export default withTheme()(SmartClauseList);
