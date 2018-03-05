/* 
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

/* Renders 4 Fabric Toggle components. Shows how to control the default checked setting and on/off display text. */
export const ToggleBasicExample = () => (
  <div>
    <Toggle
      defaultChecked={ true }
      label='Enabled and checked'
      onText='On'
      offText='Off' />
    <Toggle
      defaultChecked={ false }
      label='Enabled and unchecked'
      onText='On'
      offText='Off' />
    <Toggle
      defaultChecked={ true }
      disabled={ true }
      label='Disabled and checked'
      onText='On'
      offText='Off' />
    <Toggle
      defaultChecked={ false }
      disabled={ true }
      label='Disabled and unchecked'
      onText='On'
      offText='Off' />
  </div>
);
