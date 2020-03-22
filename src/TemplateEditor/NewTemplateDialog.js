import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    withMobileDialog,
} from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

/**
 * Creates a new template based on the selected text
 */
const NewTemplateDialog = ({ fullScreen }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedText, setSelectedText] = useState('');
    const [templateId, setTemplateId] = useState('');

  const handleClickOpen = () => {
    setIsOpen(!isOpen);
    const Office = window.Office;
    Office.context.document.getSelectedDataAsync(Office.CoercionType.Text,
        { valueFormat: "unformatted", filterType: "all" }, (asyncResult) => {
            if (asyncResult.status !== Office.AsyncResultStatus.Failed) {
                setSelectedText(asyncResult.value);
            }
        });
  };

  const handleCancel = () => {
      setIsOpen(isOpen);
  };

  const handleOk = () => {
      setIsOpen(isOpen);
  };

  const handleTemplateIdChange = (event) => {
      setTemplateId(event.target.value);
  };

  const getVariables = (str) => {
      const regex = /\[(.*?)\]/g;
      const variables = [];
      let m;

      while ((m = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
          if (m.index === regex.lastIndex) {
              regex.lastIndex++;
          }

          variables.push({key: m[1], type: 'String'});
      }

      return variables;
  }

      const properties = getVariables(selectedText);
      return (
          <div>
              <Button variant="fab" color="primary" aria-label="add" onClick={handleClickOpen}>
                  <AddIcon />
              </Button>
              <Dialog
                  fullScreen={fullScreen}
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
              >
                  <DialogTitle id="responsive-dialog-title">{'Create Smart Clause Template'}</DialogTitle>
                  <DialogContent>
                      <DialogContentText>
                        Create a new template from the selected text. Variables should be inside [square brackets].
                      </DialogContentText>
                      <TextField
                          autoFocus
                          margin="dense"
                          id="templateId"
                          label="Template Identifier"
                          type="string"
                          fullWidth
                          value = {templateId}
                          onChange={handleTemplateIdChange}
                      />
                      <Paper elevation={0}>
                          <Typography variant="title" component="h4">
                            Variables
                          </Typography>
                      </Paper>
                      {properties.map((item, index) => {
                          return (
                              <TextField
                                  autoFocus
                                  margin="dense"
                                  id="templateId"
                                  label={item.key}
                                  type="string"
                                  fullWidth
                                  value = {item.type}
                              />
                          );
                      })
                      }
                  </DialogContent>
                  <DialogActions>
                      <Button onClick={handleCancel} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={handleOk} color="primary" autoFocus>
                        Ok
                      </Button>
                  </DialogActions>
              </Dialog>
          </div>
      );
  }

NewTemplateDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
    callback: PropTypes.func.isRequired
};

export default withMobileDialog()(NewTemplateDialog);
