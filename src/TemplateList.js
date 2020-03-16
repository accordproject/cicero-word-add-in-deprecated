import React, {
    useState,
    useEffect
} from 'react';
import {
    TemplateLibrary as TemplateLibraryComponent
} from '@accordproject/cicero-ui';
import {TemplateLibrary, Template} from '@accordproject/cicero-core';
import {
    version as ciceroVersion
} from '@accordproject/cicero-core/package.json';

import {CiceroMarkTransformer} from '@accordproject/markdown-cicero';
import {HtmlTransformer} from '@accordproject/markdown-html';
import { Button } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';


export const AP_THEME = {
    DARK_BLUE: '#141F3C',
    DARK_BLUE_MEDIUM: '#182444',
    DARK_BLUE_LIGHT: '#1E2D53',
    CYAN: '#19C6C7',
    GRAY: '#B9BCC4',
    LIGHT_GRAY: '#F0F0F0',
    WHITE: '#FFFFFF',
};

export const TEMPLATE_LIBRARY = {
    HEADER_TITLE: '#939EBA',
    ACTION_BUTTON: AP_THEME.CYAN,
    ACTION_BUTTON_BACKGROUND: AP_THEME.DARK_BLUE_MEDIUM,
    ACTION_BUTTON_BORDER: '#7B8FAD',
    TEMPLATE_BACKGROUND: AP_THEME.DARK_BLUE_LIGHT,
    TEMPLATE_TITLE: AP_THEME.GRAY,
    TEMPLATE_DESCRIPTION: AP_THEME.WHITE,
};

const libraryProps = {
    HEADER_TITLE: TEMPLATE_LIBRARY.HEADER_TITLE,
    ACTION_BUTTON: TEMPLATE_LIBRARY.ACTION_BUTTON,
    ACTION_BUTTON_BG: TEMPLATE_LIBRARY.ACTION_BUTTON_BACKGROUND,
    ACTION_BUTTON_BORDER: TEMPLATE_LIBRARY.ACTION_BUTTON_BORDER,
    TEMPLATE_BACKGROUND: TEMPLATE_LIBRARY.TEMPLATE_BACKGROUND,
    TEMPLATE_TITLE: TEMPLATE_LIBRARY.TEMPLATE_TITLE,
    TEMPLATE_DESCRIPTION: TEMPLATE_LIBRARY.TEMPLATE_DESCRIPTION,
    TEMPLATES_HEIGHT: 'calc(100vh - 250px)',
};

const mockImport = () => {
    console.log('import');
};
const mockUpload = () => {
    console.log('upload');
};
const mockNewTemplate = () => {
    console.log('new template');
};

//spacing for buttons
const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(),
    },
  },
}));


/**
 * Adds the text of a template to the MS Word document.
 * @param {*} templateUri
 */

 function insertParagraph() {
   Word.run(function (context) {
     var docBody = context.document.body;
     docBody.insertParagraph("You can click here to add this text later it will come from AP Template :)", "Start");
     return context.sync();
   })
   .catch(function (error) {
     console.log("Error: " + JSON.stringify(error));
   });
 }

 function applyStyle() {
 Word.run(function (context) {
   var firstParagraph = context.document.body.paragraphs.getFirst();
   firstParagraph.styleBuiltIn = Word.Style.intenseReference;

   return context.sync();
 })
 .catch(function (error) {
   console.log("Error: " + error);
 });
}

function applyCustomStyle() {
 Word.run(function (context) {
   var lastParagraph = context.document.body.paragraphs.getLast();
   lastParagraph.style = "MyCustomStyle";

   return context.sync();
 })
 .catch(function (error) {
   console.log("Error: " + error);
 });
}


function replaceText() {
  Word.run(function (context) {
    var doc = context.document;
    var originalRange = doc.getSelection();
    originalRange.insertText("to", "from");

    return context.sync();
  })
  .catch(function (error) {
    console.log("Error: " + error);
  });
}

function changeFont() {
  Word.run(function (context) {
    var secondParagraph = context.document.body.paragraphs.getFirst().getNext();
    secondParagraph.font.set({
      name: "Courier New",
      bold: true,
      size: 18
    });

    return context.sync();
  })
  .catch(function (error) {
    console.log("Error: " + error);
  });
}


const addToContract = async (templateIndex, templateUri) => {

    /* global Word */
    Word.run(async function (context) {
        // load the template
        console.log(templateIndex);
        console.log(templateUri);
        let docBody=context.document.body;
        const hashIndex = templateUri.indexOf('#');
        const templateId = templateUri.substring(5, hashIndex);
        const templateDetails = templateIndex[templateId];
        const url = templateDetails.url;
        const template = await Template.fromUrl(url);
        const sample = template.getMetadata().getSample();
        const ciceroMarkTransformer = new CiceroMarkTransformer();
        const dom = ciceroMarkTransformer.fromMarkdown( sample );
        const htmlTransformer = new HtmlTransformer();
        const html = htmlTransformer.toHtml(dom);
        docBody.insetText("Insert some text", "Start");
        docBody.getRange("Whole").select();
        var blankParagraph = docBody.paragraphs.getLast().insertParagraph("check here", "After");
        blankParagraph.insertHtml(html, "End");
        blankParagraph.styleBuiltIn = Word.Style.intenseReference;
        return context.sync();
    })
    .catch(function (error) {
        console.log("Error: " + JSON.stringify(error));
    });
};

export const LibraryComponent = (props) => {

        const [templates, setTemplates] = useState(null);
        const [templateIndex, setTemplateIndex] = useState(null);
        useEffect(() => {
           async function load() {
                const templateLibrary = new TemplateLibrary();
                const templateIndex = await templateLibrary
                    .getTemplateIndex({
                        latestVersion: true,
                        ciceroVersion
                    });
                setTemplateIndex(templateIndex);
                setTemplates(Object.values(templateIndex))
            };
            load();
        },[]);

        const classes = useStyles();
        return (
          <div className={classes.root}>
            <Button variant="contained" color="primary" onClick={insertParagraph}>Insert Some Text</Button>
            <Button variant="contained" color="primary" onClick={applyCustomStyle}>FIND AND REPLACE</Button>
            <Button variant="contained" color="primary" onClick={applyStyle}>Apply Style</Button>
            <Button variant="contained" color="primary" onClick={changeFont}>Change Font</Button>
            <TemplateLibraryComponent
                templates = {templates}
                upload = {mockUpload}
                import = {mockImport}
                addTemp = {mockNewTemplate}
                addToCont = { (templateUri) => addToContract(templateIndex, templateUri)}
                libraryProps = {libraryProps}
            />
          </div>

      );
        };

        export default LibraryComponent;
