/* 
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
import * as React from 'react';
import { CompoundButton , DefaultButton, PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import '../assets/styles/global.scss';

/* Defines a ButtonDefaultExample React component that renders a Fabric Label and DefaultButton. */
export class ButtonDefaultExample extends React.Component<IButtonProps, {}> {
  public render() {
    let { disabled } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <div>
            <Label>Default Button</Label>
          <DefaultButton
            data-automation-id='test'
            disabled={ disabled }
            icon='Add'
            description='A description...'
            text='Create account'
          />
        </div>
      </div>
    );
  }
}

/* Defines a ButtonPrimary React component that renders a Fabric Label and PrimaryButton. */
export class ButtonPrimary extends React.Component<IButtonProps, {}> {
  public constructor() {
    super();
  }

  public render() {
    let { disabled } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Primary button</Label>
        <PrimaryButton
          data-automation-id='test'
          disabled={ disabled }
          text='Create account'
        />
      </div>
    );
  }
}

/* Defines a ButtonCompound React component that renders a Fabric Label and CompoundButton. */
export class ButtonCompound extends React.Component<IButtonProps, {}> {
  public constructor() {
    super();
  }

  public render() {
    let { disabled } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Compound button</Label>
        <CompoundButton
          description='You can create a new account here.'
          disabled={ disabled }
        >
          Create account
        </CompoundButton>
      </div>
    );
  }
}