import React, { Component } from 'react';
import { Button, Form, Header, Input, Modal } from 'semantic-ui-react';

export default class TemplateEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templateName: ''
    };

    this.handleTemplateNameChange = this.handleTemplateNameChange.bind(this);
    this.handleVarTypeChange = this.handleVarTypeChange.bind(this);    
  }

  handleTemplateNameChange(event) {
    this.setState({templateName: event.target.value});
  }

  handleVarTypeChange() {
    
  }

  render() {
    return(
      <div>
        <Modal
          basic
          open={this.props.open}
          onClose={this.props.handleClose}
        >
          <Modal.Content>
            <Input
              autoFocus
              margin="dense"
              className="template-name"
              label="Template Name"
              type="text"
              value = {this.state.templateName}
              onChange={this.handleTemplateNameChange}
            />
            <Header variant="title" component="h4">
              Variables
            </Header>
            <Form>
              {this.props.variables.map((item, index) => {
                return (
                  <Form.Field>
                    <label>{item.key}</label>
                    <Input
                      key={item.id}
                      className="variable-input"
                      type="text"
                      onChange={this.handleVarTypeChange()}
                    />
                  </Form.Field>
                );
              })
              }
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.props.handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.handleSubmit} color="primary" autoFocus>
              Submit
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}