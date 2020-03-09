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

/**
 * Links the currently selected text to a Template - creating a Smart Clause.
 * MS Office 'Bindings' are used to maintain the link between the text and the template and clause id.
 */
class NewSmartClauseDialog extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        open: false,
        selectedText: '',
        clauseId: '',
        templateId: ''
      };

      this.bind = this.handleClickOpen.bind(this);
      this.bind = this.handleCancel.bind(this);
      this.bind = this.handleOk.bind(this);
      this.bind = this.handleClauseIdChange.bind(this);
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
    const that = this;
    window.Office.context.document.bindings.addFromSelectionAsync(window.Office.BindingType.Text, { id: that.state.clauseId + '/' + that.state.templateId }, function (asyncResult) {
        that.props.callback();
    });
  };

  handleClauseIdChange = (event) => {
    this.setState({clauseId: event.target.value});
  }

  handleTemplateIdChange = (event) => {
    this.setState({templateId: event.target.value});
  }

  render() {
    const { fullScreen } = this.props;
    const { open,clauseId,templateId } = this.state;

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
          <DialogTitle id="responsive-dialog-title">{"Insert Smart Clause"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bind the selected text to an existing template.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="clauseId"
              label="Clause Identifier"
              type="string"
              fullWidth
              value = {clauseId}
              onChange={this.handleClauseIdChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="templateId"
              label="Template Identifier"
              type="string"
              fullWidth
              value = {templateId}
              onChange={this.handleTemplateIdChange}
            />
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

NewSmartClauseDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired
};

export default withMobileDialog()(NewSmartClauseDialog);
