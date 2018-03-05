/* 
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
import * as React from 'react';
import { Header } from './header';
import {ControlPivot} from './pivot';

export class App extends React.Component<any, any> {
    constructor(props, context) {
        super(props, context);
    }

    /* Renders the body of the add-in which includes a header (header.tsx) and pivot (pivot.tsx).*/
    render() {
        return (
            <div className='ms-welcome'>
                <Header title={this.props.title} message='Smart Clauses' />
                <ControlPivot />
            </div>
        );
    };
};
