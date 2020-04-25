import React,{useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
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
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from "@material-ui/core/FormControlLabel"

/**
 * Links the currently selected text to a Template - creating a Smart Clause.
 * MS Office 'Bindings' are used to maintain the link between the text and the template and clause id.
 */

const NewSmartClauseDialog = ({ fullScreen, callback }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedText, setSelectedText] = useState('');
    const [isChecked, setChecked] = useState(window.Office.context.document.settings.get("Office.AutoShowTaskpaneWithDocument"));

    const handleClickOpen = () => {
        const document = window.Office.context.document;
        setIsOpen(true);
        document.getSelectedDataAsync(window.Office.CoercionType.Text,
            { valueFormat: 'unformatted', filterType: 'all' }, (asyncResult) => {
                if (asyncResult.status !== window.Office.AsyncResultStatus.Failed) {
                    setSelectedText(asyncResult.value);
                }
            });
    };

    const handleCancel = () => {
        setIsOpen(false);
    };


    const handleKeyPress = (event) => {
        if(event.key === 'Enter')
            handleOk();
    };

    const handleOk = (values) => {
        if(values.clauseId.trim() !== '' && values.templateId.trim() !== '') {
            const Office = window.Office;
            const bindings = Office.context.document.bindings;
            bindings.addFromSelectionAsync(Office.BindingType.Text, { id: values.clauseId + '/' + values.templateId }, (asyncResult) => {
                callback();
            });
            setIsOpen(false);
        }
    };

    const handleChange = () => {

        if(isChecked === false) {
            window.Office.context.document.settings.set("Office.AutoShowTaskpaneWithDocument", true); 
            window.Office.context.document.settings.saveAsync();
            setChecked(true);
            return;
        }

        if(isChecked === true) {
            window.Office.context.document.settings.set("Office.AutoShowTaskpaneWithDocument", false);
            window.Office.context.document.settings.saveAsync();
            setChecked(false);
            return;
        }
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen} startIcon={<AddIcon />}>
             Create new
            </Button> <br/><br/>
            <Checkbox checked={isChecked} color="primary" onChange={handleChange} /><label className="autoOpen">AutoOpen Document</label>
            <Dialog
                fullScreen={fullScreen}
                open={isOpen}
                onClose={handleCancel}
                aria-labelledby="responsive-dialog-title"
            >
                <Form
                    onSubmit={handleOk}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit}>
                            <DialogTitle id="responsive-dialog-title">{'Insert Clause Template'}</DialogTitle>
                            <DialogContent className='dialog-content'>
                                <DialogContentText>
                                     Bind the selected text to an existing template.
                                </DialogContentText>
                                <Field name='clauseId' validate={value => (value && value.trim() ? '' : 'Must have valid ClauseId')}>
                                    {({ input, meta }) => (
                                        <Fragment>
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
                                        </Fragment>
                                    )}
                                </Field>
                                <Field name='templateId' validate={value => (value && value.trim() ? '' : 'Must have valid TemplateId')}>
                                    {({ input, meta }) => (
                                        <Fragment>
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
                                        </Fragment>
                                    )}
                                </Field>
                            </DialogContent>
                            <DialogActions className="dialogAction">
                                <Button color="primary" variant="contained" onClick={handleCancel}>
                                     Cancel
                                </Button>
                                <Button type="submit" color="primary" variant="contained" onKeyPress={handleKeyPress} autoFocus>
                                    Ok
                                </Button>
                            </DialogActions>
                        </form>)}
                />
            </Dialog>
        </div>
    );
};

NewSmartClauseDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
    callback: PropTypes.func.isRequired
};

export default withMobileDialog()(NewSmartClauseDialog);
