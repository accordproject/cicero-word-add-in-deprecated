import React,{useState} from 'react';
import Checkbox from "@material-ui/core/Checkbox";
import './index.css';

const Footer = () => {

    var isAutoOpen = Boolean(window.Office.context.document.settings.get("Office.AutoShowTaskpaneWithDocument"));
    const [isChecked, setChecked] = useState(isAutoOpen);

    const handleClick = () => {

        if(isChecked === false) {
            window.Office.context.document.settings.set("Office.AutoShowTaskpaneWithDocument", true); 
            window.Office.context.document.settings.saveAsync();
            setChecked(true);
            return;
        }

        if(isChecked === true) {
            window.Office.context.document.settings.remove("Office.AutoShowTaskpaneWithDocument");
            window.Office.context.document.settings.saveAsync();
            setChecked(false);
            return;
        }
    }

    return(
        <footer className="footer"><div className="checkbox"><Checkbox checked={isChecked} color="primary" onClick={handleClick} /><label>Open Cicero Word Add-in on startup</label></div><p className="footer-text">COPYRIGHT © 2017-2019 <a target="_blank" href="https://www.accordproject.org/" rel="noopener noreferrer">ACCORD PROJECT</a>,<br/> A SERIES OF LF PROJECTS, LLC.</p></footer>
    );
};

export default Footer;