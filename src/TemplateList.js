import React, { useState, useEffect } from 'react';
import { TemplateLibrary } from '@accordproject/cicero-ui';
import loadTemplates from './loadTemplates';

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

const mockImport = () => { console.log('import'); };
const mockUpload = () => { console.log('upload'); };
const mockNewTemplate = () => { console.log('new template'); };
const mockAddToContract = () => { console.log('add to contract'); };

export const LibraryComponent = (props) => {

    const [templates, setTemplates] = useState( null );

    async function load() {
        let templates = await loadTemplates();
        setTemplates(templates)
      }

    useEffect( () => {
        load();
    }, []);

    return (
        <TemplateLibrary
            templates={templates}
            upload={mockUpload}
            import={mockImport}
            addTemp={mockNewTemplate}
            addToCont={mockAddToContract}
            libraryProps={libraryProps}
        />);
};

export default LibraryComponent;