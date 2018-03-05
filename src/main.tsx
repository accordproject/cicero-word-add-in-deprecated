/* 
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import * as React from 'react';
import { render } from 'react-dom';
import { App } from './components/app';
import { Progress } from './components/progress';
import './assets/styles/global.scss';

(() => {
    const title = 'Smart Clauses';
    const container = document.querySelector('#container');

    /* Render application after Office initializes. If the page is rendered in an Office add-in, show the UI using the render function 
    defined in App.tsx. Otherwise, show a progress indicator with a message. */
     Office.initialize = () => {
        render(
            <App title={title} />,
            container
        );
     };

    /* Initial render showing a progress bar */
    render(<Progress title={title} logo='assets/logo-filled.png' message='Please sideload your addin to see app body.' />, container);
})();

