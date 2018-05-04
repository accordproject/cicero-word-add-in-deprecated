import React, { Component } from 'react';
import { Button, Header, } from 'semantic-ui-react';
import TemplateEditor from './TemplateEditor';

export default class Templatecreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedText: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
  }

  handleClick() {
    const that = this;
    window.Office.context.document.getSelectedDataAsync(window.Office.CoercionType.Text, 
      { valueFormat: 'unformatted', filterType: 'all' },
      function (asyncResult) {
        if (asyncResult.status !== window.Office.AsyncResultStatus.Failed) {
          that.setState({ selectedText: asyncResult.value });
        }
      });
    that.setState({ open: true });
  }

  handleCancel() {
    this.setState({ open: false });
  }

  handleSubmit() {
    this.setState({ open: false });
  }

  getVariables(str) {
    const regex = /\[(.*?)\]/g;
    const variables = [];
    let m;

    while ((m = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      variables.push({key: m[1], type: 'String'});
    }

    return variables;
  }

  get templateEditorModal() {
    return (
      <TemplateEditor 
        variables = {this.getVariables(this.state.selectedText)}
        handleCancel = {this.state.handleCancel}
        handleSubmit = {this.state.handleSubmit}
        open = {this.props.open} 
      />
    );
  }

  render() {
    return(
      <div>
        <Header>
          Select the text you'd like to create a smart clause from. Variables should be in [square brackets].
        </Header>
        <Button 
          color="primary"
          onClick={this.handleClick.bind(this)}
          icon="plus"
        />
        { this.templateEditorModal }
      </div>
    );
  }
}