/* 
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
import * as React from 'react';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';


export interface IChoiceGroupBasicExampleState {
  imageKey: string;
}

/* Renders the ChoiceGroupBasicExample React control which consists of a Fabric ChoiceGroup component.*/
export class ChoiceGroupBasicExample extends React.Component<any, IChoiceGroupBasicExampleState> {
  constructor() {
    super();

    this.state = {
      imageKey: ''
    };
  }

/* Render a ChoiceGroup component with options, and wire up the onChange event. */
  public render() {
    return (
      <ChoiceGroup
        options={ [
          {
            key: 'A',
            text: 'Option A'
          },
          {
            key: 'B',
            text: 'Option B',
          },
          {
            key: 'C',
            text: 'Option C',
            disabled: true
          },
          {
            key: 'D',
            text: 'Option D',
            disabled: true
          }
        ] }
        onChange={ this._onChange }
        label='Pick one'
        required={ true }
      />
    );
  }

  @autobind
  private _onChange(ev: React.FormEvent<HTMLInputElement>, option: any) {
    console.dir(option);
    console.log('' +ev.timeStamp);
  }
}




/* Renders the ChoiceGroupIconExample React control which consists of a Fabric ChoiceGroup component that displays icons.*/
export class ChoiceGroupIconExample extends React.Component<any, any> {
  public render() {
    return (
      <ChoiceGroup
        label='Pick an icon'
        options={ [
          {
            key: 'day',
            iconProps: { iconName: 'CalendarDay' },
            text: 'Day'
          },
          {
            key: 'week',
            iconProps: { iconName: 'CalendarWeek' },
            text: 'Week'
          },
          {
            key: 'month',
            iconProps: { iconName: 'Calendar' },
            text: 'Month',
            disabled: true
          }
        ] }
      />
    );
  }
}


