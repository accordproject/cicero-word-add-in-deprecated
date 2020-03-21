import React,{Component} from 'react';
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
import '../index.css';
import { Form, Field } from 'react-final-form';


/**
 * Links the currently selected text to a Template - creating a Smart Clause.
 * MS Office 'Bindings' are used to maintain the link between the text and the template and clause id.
 */

class NewSmartClauseDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            selectedText: '',
        };
    }

  handleClickOpen = () => {
    const document = window.Office.context.document;
    this.setState({ open: true });
    document.getSelectedDataAsync(window.Office.CoercionType.Text,
        { valueFormat: "unformatted", filterType: "all" }, (asyncResult) => {
            if (asyncResult.status !== window.Office.AsyncResultStatus.Failed) {
                this.setState( {selectedText: asyncResult.value});
            }
        });
  };

  handleCancel = () => {
      this.setState({ open: false });
  };

  handleKeyPress = (event) => {
      if(event.key === 'Enter')
        this.handleOk();
    }

  handleOk = (values) => {
    if(values.clauseId.trim() !== '' && values.templateId.trim() !== '') {
      const Office = window.Office;
      const bindings = Office.context.document.bindings;
          bindings.addFromSelectionAsync(Office.BindingType.Text, { id: values.clauseId + '/' + values.templateId }, (asyncResult) => {
          this.props.callback();
      });
      this.setState({ open: false })
    }
  };

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
                  onClose={this.handleCancel}
                  aria-labelledby="responsive-dialog-title"
              >
                  <Form
                      onSubmit={this.handleOk}
                      render={({ handleSubmit, form, submitting, pristine, values }) => (
                          <form onSubmit={handleSubmit}>
                              <DialogTitle id="responsive-dialog-title">{'Insert Clause Template'}</DialogTitle>
                              <DialogContent className='dialog-content'>
                                  <DialogContentText>
                                        Bind the selected text to an existing template.
                                  </DialogContentText>
                                  <Field name='clauseId' validate={value => (value && value.trim() ? '' : 'Must have valid ClauseId')}>
                                      {({ input, meta }) => (
                                          <>
                                              <TextField
                                                  {...input}
                                                  autoFocus
                                                  margin="dense"
                                                  id="clauseId"
                                                  label="Clause Identifier"
                                                  type="text"
                                                  fullWidth
                                                  value = {values.clauseId}
                                              />
                                              {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                                          </>
                                      )}
                                  </Field>
                                  <Field name='templateId' validate={value => (value && value.trim() ? '' : 'Must have valid TemplateId')}>
                                      {({ input, meta }) => (
                                          <>
                                              <TextField
                                                  {...input}
                                                  autoFocus
                                                  margin="dense"
                                                  id="templateId"
                                                  label="Template Identifier"
                                                  type="text"
                                                  fullWidth
                                                  value = {values.templateId}
                                              />
                                              {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                                          </>
                                      )}
                                  </Field>
                              </DialogContent>
                              <DialogActions>
                                  <Button onClick={this.handleCancel} color="primary">
                                        Cancel
                                  </Button>
                                  <Button type="submit" color="primary" onKeyPress={this.handleKeyPress} autoFocus>
                                         Ok
                                  </Button>
                              </DialogActions>
                          </form>)}
                  />
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
