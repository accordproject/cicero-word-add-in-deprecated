import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';

class BindDialog extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        open: false,
      };    
    }

  handleClickOpen() {
    this.setState({ open: true });
  };

  handleCancel() {
    this.setState({ open: false });
  };

  handleOk() {
    this.setState({ open: false });
    const that = this;
    window.Office.context.document.bindings.addFromSelectionAsync(window.Office.BindingType.Text, { id: 'MyBinding' }, function (asyncResult) {
        that.props.callback();
    });
  };

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Button onClick={this.handleClickOpen.bind(this)}>New...</Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Create Smart Clause"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bind the selected text to a template, or create a new template.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel.bind(this)} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleOk.bind(this)} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

BindDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired,
};

export default withMobileDialog()(BindDialog);