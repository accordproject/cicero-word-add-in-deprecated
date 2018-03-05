/* 
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

export class TextFieldBasicExample extends React.Component<any, any> {

/* Renders several variations of the Fabric TextField component. */
  public render() {
    return (
      <div>
        <TextField className='ms-welcome__txtfield' label='Default TextField' onChanged={ this._onChanged } />
        <TextField className='ms-welcome__txtfield' label='Disabled TextField' disabled={ true } />
        <TextField className='ms-welcome__txtfield' label='Required TextField' required={ true } />
        <TextField className='ms-welcome__txtfield' label='TextField with a placeholder' placeholder='Placeholder text' ariaLabel='Please enter text here' />
        <TextField className='ms-welcome__txtfield' label='Multiline TextField' multiline rows={ 4 } />
      </div>
    );
  }

  @autobind
  private _onChanged(text) {
    console.log(text);
  }
}
