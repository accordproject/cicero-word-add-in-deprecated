/* 
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
import * as React from 'react';
import {
  Checkbox
} from 'office-ui-fabric-react/lib/Checkbox';

export interface ICheckboxBasicExampleState {
  isChecked: boolean;
}

export class CheckboxBasicExample extends React.Component<{}, ICheckboxBasicExampleState> {
  constructor() {
    super();

    this.state = {
      isChecked: false
    };

    this._onCheckboxChange = this._onCheckboxChange.bind(this);
  }

  /* Renders Fabric React checkboxes and wires up the onChange event.*/
  
  public render() {
    return (
      <div>
        <Checkbox
          label='Uncontrolled checkbox'
          onChange={ this._onCheckboxChange }
          inputProps={ {
            onFocus: () => { console.log('Uncontrolled checkbox is focused'); },
            onBlur: () => { console.log('Uncontrolled checkbox is blured'); }
          } } />

        <Checkbox
          label='Uncontrolled checkbox with defaultChecked true'
          defaultChecked={ true }
          onChange={ this._onCheckboxChange } />

        <Checkbox
          label='Disabled uncontrolled checkbox with defaultChecked true'
          disabled={ true }
          defaultChecked={ true }
          onChange={ this._onCheckboxChange } />

        
      </div>
    );
  }

  private _onCheckboxChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean) {
    console.log(`The option has been changed to ${isChecked}.`+ ev.timeStamp);
  }

}
