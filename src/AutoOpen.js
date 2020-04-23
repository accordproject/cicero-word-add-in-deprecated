import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

const AutoOpen = () => {

    const [open, setOpen] = useState(false);
    const [autoOpen, setAutoOpen] = useState(false);
    var message = autoOpen?"Auto-Open Enabled":"Auto-Open Disabled";

    const handlesetAutoOpen = (event) => {
            
            window.Office.context.document.settings.set("Office.AutoShowTaskpaneWithDocument", true); 
            window.Office.context.document.settings.saveAsync();
            setOpen(true);
            setAutoOpen(true);
            return;
        }

    const handlesetAutoOff = (event) => {

            window.Office.context.document.settings.remove("Office.AutoShowTaskpaneWithDocument");
            window.Office.context.document.settings.saveAsync();
            setOpen(true);
            setAutoOpen(false);
            return;
    };

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
        <h1 className="auto-open-heading">Auto Open</h1>
            <div className="auto-open">
                <p>After you set auto-open to on, save the document and reopen it, it automatically opens the taskpane.</p>
                    <div className="buttons">    
                        <Button variant="contained" color="primary" size="small" onClick={handlesetAutoOpen}> Set auto-open On </Button><br/><br/>
                        <Button variant="contained" color="primary" size="small" onClick={handlesetAutoOff}> Set auto-open OFF </Button>
                    </div>
            </div>
            <Snackbar open={open} autoHideDuration={1000} message={message} onClose={handleClose}></Snackbar>
        </div>
    )
}

export default AutoOpen