/* 
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
import * as React from 'react';
import {
    Pivot,
    PivotItem,
    PivotLinkFormat
} from 'office-ui-fabric-react/lib/Pivot';
import { ButtonDefaultExample, ButtonPrimary, ButtonCompound } from './button';
import { BreadcrumbBasicExample } from './breadcrumb';
import { CheckboxBasicExample } from './checkbox';
import { ChoiceGroupBasicExample, ChoiceGroupIconExample } from './choicefieldgroup';
import { DropdownBasicExample } from './dropdown';
import { LabelBasicExample } from './label';
import { TextFieldBasicExample } from './textfield';
import { ToggleBasicExample } from './toggle';
import { List } from 'office-ui-fabric-react/lib/List';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';

export class ControlPivot extends React.Component<any, any> {
    constructor(props, context) {
        super(props, context);

        // this._onFilterChanged = this._onFilterChanged.bind(this);

        this.state = {
            filterText: '',
            message: '',
            items: []
          };

         this._refresh();
    }

    private _refresh() {
        const that = this;

        Office.context.document.bindings.getAllAsync(function (asyncResult) {
            if(asyncResult) {
                that.state.items = [];

                for (var i in asyncResult.value) {
                    const id = asyncResult.value[i].id;
                    that.state.items.push( {name: id });
                }
                that.setState(that.state);
            }
            else {
                that.state.message = 'Could not get bindings.';
            }
        });    
    }

    private _bindSelection() {
        Office.context.document.bindings.addFromSelectionAsync(Office.BindingType.Text, { id: 'binding:' + this.state.items.length });
        this._refresh();
    }

    /* 
    Renders a pivot control with 3 pivot items - Simple, Advanced, and TextField. The pivot items display as tabs, and are used for navigation.
    On each pivot item, one or more React controls are displayed. For example, there are 3 React controls displayed under Buttons - 
    ButtonDefaultExample, ButtonPrimary, and ButtonCompound. These react controls are defined in button.tsx.
    */
    public render() {
        return (
            <div className='ms-welcome__pivot'>
                <div className='ms-font-xl ms-welcome__padtwenty'>Bindings</div>
                <Label>{this.state.message}</Label>
                <DefaultButton
                    data-automation-id='refresh'
                    text='Refresh'
                    onClick={ this._refresh.bind(this) }
                />
                <DefaultButton
                    data-automation-id='bind'
                    text='Bind'
                    onClick={ this._bindSelection.bind(this) }
                />
                <List items={ this.state.items } />
            </div>
        );
    };
};

