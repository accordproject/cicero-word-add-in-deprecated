/* 
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import { Label } from 'office-ui-fabric-react/lib/Label';

/* Renders 3 Fabric Labels.*/

export const LabelBasicExample = () => (
  <div>
    <Label>I'm a Label</Label>
    <Label disabled={ true }>I'm a disabled Label</Label>
    <Label required={ true }>I'm a required Label</Label>
  </div>
);
