import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
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

class BindDialog extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        open: false,
        selectedText: '',
        variables: [],
        clauseId: '',
        templateId: ''
      };
    }

  handleClickOpen() {
    const that = this;
    that.setState({ open: true });

    window.Office.context.document.getSelectedDataAsync(window.Office.CoercionType.Text, 
        { valueFormat: "unformatted", filterType: "all" },
        function (asyncResult) {
            var error = asyncResult.error;
            if (asyncResult.status !== window.Office.AsyncResultStatus.Failed) {
                that.setState( {selectedText: asyncResult.value});
                that.setState( {variables: that.getVariables(asyncResult.value)})
            }
        });
  };

  getVariables(str) {
    const regex = /\[(.*?)\]/g;
    const variables = [];
    var m;

    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            variables.push(match);
        });
    }

    return variables;
}

  handleCancel() {
    this.setState({ open: false });
  };

  handleOk() {
    this.setState({ open: false });
    const that = this;
    window.Office.context.document.bindings.addFromSelectionAsync(window.Office.BindingType.Text, { id: that.state.clauseId + '/' + that.state.templateId }, function (asyncResult) {
        that.props.callback();
    });
  };

  handleClauseIdChange(event) {
    this.setState({clauseId: event.target.value});
  }

  handleTemplateIdChange(event) {
    this.setState({templateId: event.target.value});
  }

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
              Bind the selected text to an existing template, or create a new template from the selected text.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="clauseId"
              label="Clause Identifier"
              type="string"
              fullWidth
              value = {this.state.clauseId}
              onChange={this.handleClauseIdChange.bind(this)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="templateId"
              label="Template Identifier"
              type="string"
              fullWidth
              value = {this.state.templateId}
              onChange={this.handleTemplateIdChange.bind(this)}
            />
            <Paper elevation={0}>
                <Typography variant="headline" component="h3">
                Selected Text
                </Typography>
                <Typography component="p">
                {this.state.selectedText}
                </Typography>
            </Paper>
            <Paper elevation={0}>
                <Typography variant="headline" component="h3">
                Variables
                </Typography>
                <Typography component="p">
                {this.state.variables[0]}
                </Typography>
            </Paper>
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
  callback: PropTypes.func.isRequired
};

export default withMobileDialog()(BindDialog);
