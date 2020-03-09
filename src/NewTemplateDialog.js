import React from 'react';
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
class NewTemplateDialog extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        open: false,
        selectedText: '',
        templateId: ''
      };
      // Binded the functions inside the constructor itself
      this.bind = this.handleClickOpen.bind(this);
      this.bind = this.handleCancel.bind(this);
      this.bind = this.handleOk.bind(this);
      this.bind = this.handleTemplateIdChange.bind(this);
    }

  handleClickOpen = () => {
    const that = this;
    that.setState({ open: true });

    window.Office.context.document.getSelectedDataAsync(window.Office.CoercionType.Text,
        { valueFormat: "unformatted", filterType: "all" },
        function (asyncResult) {
            if (asyncResult.status !== window.Office.AsyncResultStatus.Failed) {
                that.setState( {selectedText: asyncResult.value});
            }
        });
  };

  handleCancel = () => {
    this.setState({ open: false });
  };

  handleOk = () => {
    this.setState({ open: false });
  };

  handleTemplateIdChange = (event) => {
    this.setState({templateId: event.target.value});
  }

  static getVariables(str) {
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

  render() {
    const { fullScreen } = this.props;
    const { open,templateId } = this.state;
    const properties = NewTemplateDialog.getVariables(this.state.selectedText);
    return (
      <div>
        <Button variant="fab" color="primary" aria-label="add" onClick={this.handleClickOpen}>
          <AddIcon />
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Create Smart Clause Template"}</DialogTitle>
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
              value = {this.state.templateId}
              onChange={this.handleTemplateIdChange}
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
            <Button onClick={this.handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleOk} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

NewTemplateDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired
};

export default withMobileDialog()(NewTemplateDialog);
