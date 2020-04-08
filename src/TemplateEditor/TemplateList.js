import React, {
    useState,
    useEffect
} from 'react';
import {
    TemplateLibrary as TemplateLibraryComponent
} from '@accordproject/cicero-ui';
import {TemplateLibrary, Template, Clause} from '@accordproject/cicero-core';
import {CircularProgress} from 'material-ui';
import {
    version as ciceroVersion
} from '@accordproject/cicero-core/package.json';

import {CiceroMarkTransformer} from '@accordproject/markdown-cicero';
import {HtmlTransformer} from '@accordproject/markdown-html';

export const AP_THEME = {
    DARK_BLUE: '#141F3C',
    DARK_BLUE_MEDIUM: '#182444',
    DARK_BLUE_LIGHT: '#1E2D53',
    CYAN: '#19C6C7',
    GRAY: '#B9BCC4',
    LIGHT_GRAY: '#F0F0F0',
    WHITE: '#FFFFFF',
    BLACK: '#000'
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
    SEARCH_COLOR: AP_THEME.BLACK
};

const mockImport = () => {
};
const mockUpload = () => {
};
const mockNewTemplate = () => {
};

/**
 * Adds the text of a template to the MS Word document.
 * @param {*} templateUri
 */
const addToContract = async (templateIndex, templateUri) => {

    /* global Word */
    Word.run(async function (context) { 

        // load the template
        const hashIndex = templateUri.indexOf('#');
        const templateId = templateUri.substring(5, hashIndex);
        const templateDetails = templateIndex[templateId];
        const url = templateDetails.url;
        const template = await Template.fromUrl(url);
        const sample = template.getMetadata().getSample();
        // console.log(sample);
        const clause = new Clause(template);
        clause.parse(sample);
        // console.log(JSON.stringify(clause.getData(), null, 2))
        const sampleWrapped = await clause.draft({ wrapVariables: true });
        // console.log(sampleWrapped);
        const ciceroMarkTransformer = new CiceroMarkTransformer();
        const dom = ciceroMarkTransformer.fromMarkdown(sampleWrapped, 'json');
        console.log(dom)
        dom.nodes.forEach((node) => {

            let mainClass = node.$class;
            node.nodes.forEach((subNode) => {
                let subClass = subNode.$class;
                let text = subNode.text;
                if(mainClass === 'org.accordproject.commonmark.Heading') {
                    context.document.body.insertParagraph(text, "End").font.set({
                        color: 'black',
                        size: 13
                    });
                    context.document.body.insertParagraph(" ", "End");
                }

                else if(mainClass === 'org.accordproject.commonmark.Paragraph') {

                    if(subClass === 'org.accordproject.commonmark.Text') {
                        context.document.body.insertText(text, "End").font.set({
                            color: 'black',
                            size: 11
                        });
                    }
                    else if(subClass === 'org.accordproject.commonmark.Softbreak') {
                        context.document.body.insertText(" ", "End").font.set({
                            color: 'black',
                            size: 11
                        });
                    }
                    else if(subClass === 'org.accordproject.ciceromark.Variable' || subClass === 'org.accordproject.ciceromark.ComputedVariable') {
                        let variable = subNode.value;
                        let variableText = context.document.body.insertText(variable, "End");
                        variableText.insertContentControl().font.set({
                            color: 'blue',
                            size: 11
                        });
                        variableText.title = subNode.id;
                        variableText.tag = subNode.id;
                    }                  
                }
            }) 
        })
        await context.sync()
        let contentControl = context.document.contentControls;
        context.load(contentControl, 'text');
        return context.sync();
    })
    .catch(function (error) {
        console.log("Error: " + error);
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
            setTemplates(Object.values(templateIndex));
        }
        load();
    },[]);

    if(!templates){
        return  (<div className="template-list-loading-spinner"><CircularProgress /></div>);
    }

    return ( 
        <TemplateLibraryComponent 
            templates = {templates}
            upload = {mockUpload}
            import = {mockImport}
            addTemp = {mockNewTemplate}
            addToCont = { (templateUri) => addToContract(templateIndex, templateUri)}
            libraryProps = {libraryProps}
        />);
};

export default LibraryComponent;
