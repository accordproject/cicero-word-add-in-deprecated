import React from 'react';
import { Button, Dropdown, Form, Header, Input, Label, } from 'semantic-ui-react';

// import auth0 from 'auth0-js';

import Auth from './util/Auth';
// import TemplateCreator from './SmartClauseTemplate/TemplateCreator';
// import TopNavigation from './TopNavigation';

/**
 * Root component for the app
 */
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: new Auth,
      user: null,
      githubRepo: null,
      selectedText: '',
      variables: [],
      variableObjs: [],
      templateName: '',
      parameters: [],
    };

    this.renderText = this.renderText.bind(this);
    this.extractKeywords = this.extractKeywords.bind(this);
    this.highlightVars = this.highlightVars.bind(this);
    this.createBindingFromSelection = this.createBindingFromSelection.bind(this);  
    this.handleChangeName = this.handleChangeName.bind(this);
    this.goToBinding = this.goToBinding.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);  
    this.handleDataTypeChange = this.handleDataTypeChange.bind(this);
    this.handleSampleChange = this.handleSampleChange.bind(this);
  }

  componentDidMount() {
    // this.login();
  }
  
  extractKeywords() {
    const that = this;
    
    const text = this.state.selectedText;
    
    const regex = /\[(.*?)\]/g;
    const variables = [];
    let m;
    
    while ((m = regex.exec(text)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      
      variables.push({id: variables.length, key: m[1], type: 'String'});
    }
    
    that.setState({variableObjs: variables.map((varObj) => (varObj))});
    that.setState({variables: variables.map((varObj) => (varObj.key))});
  }

  handleChangeName(event) {
    this.setState({templateName: event.target.value});
  }

  handleDataTypeChange(varName, event, data) {  
    const parameters = this.state.parameters;
    let paramObj = parameters.find((param) => param.name === varName);
    if (paramObj) {
      for (let i in parameters) {
        if (parameters[i].name === varName) {
          parameters[i].dataType = data.value;
          break;
        }
        i++;
      }
    } else {
      parameters.push ({ name: varName, dataType: data.value });
    }
    this.setState({ parameters });
  }

  handleSampleChange(varName, event) {
    const parameters = this.state.parameters;
    let paramObj = parameters.find((param) => param.name === varName);
    if (paramObj) {
      for (let i in parameters) {
        if (parameters[i].name === varName) {
          parameters[i].sample = event.target.value;
          break;
        }
        i++;
      }
    } else {
      parameters.push ({ name: varName, sample: event.target.value });
    }
    this.setState({ parameters });
  }
  
  handleSubmit() {
    console.log('State upon submit', this.state);
    this.setState({ open: false });
  }

  createBindingForVar(variable) {
    let searchResults;
    // Run a batch operation against the Word object model.
    window.Word.run(function (context) {
      // Queue a command to search the document with a wildcard
      searchResults = context.document.body.search(variable.key, {matchWildCards: true});

      // Queue a command to load the search results and get the font property values.
      context.load(searchResults);
      
      // Synchronize the document state by executing the queued commands, 
      // and return a promise to indicate task completion.
      return context.sync().then(function () {
        console.log('Found count: ' + searchResults.items.length);
        console.log('search results', searchResults.items);

        // Queue a set of commands to change the font for each found item.
        for (var i = 0; i < searchResults.items.length; i++) {
          let range = searchResults.items[i];
          console.log(({range}));
          let contentControl = range.insertContentControl();
          let title = `${variable.key} ${i}`;
          contentControl.title = title;
          contentControl.tag = variable.key;
          console.log({contentControl});
        }

        // Synchronize the document state by executing the queued commands, 
        // and return a promise to indicate task completion.
        return context.sync();
      });  
    })
      .then(() => {            
        for (var j = 0; j < searchResults.items.length; j++) {
          let title = `${variable.key} ${j}`;

          window.Office.context.document.bindings.addFromNamedItemAsync(title, window.Office.BindingType.Text, { id: title }, function (asyncResult) {
            console.log('name of item', (title));
            console.log({ asyncResult });
          });
        }
      })
      .catch(function (error) {
        console.log('Error: ' + JSON.stringify(error));
        if (error instanceof window.OfficeExtension.Error) {
          console.log('Debug info: ' + JSON.stringify(error.debugInfo));
        }
      });
  }

  highlightVars(variable) {
    // Run a batch operation against the Word object model.
    window.Word.run(function (context) {
      // Queue a command to search the document with a wildcard
      var searchResults = context.document.body.search(variable.key, {matchWildCards: true});

      // Queue a command to load the search results and get the font property values.
      context.load(searchResults, 'font');
      
      // Synchronize the document state by executing the queued commands, 
      // and return a promise to indicate task completion.
      return context.sync().then(function () {
        console.log('Found count: ' + searchResults.items.length);
        console.log('search results', searchResults.items);

        // Queue a set of commands to change the font for each found item.
        for (var i = 0; i < searchResults.items.length; i++) {
          searchResults.items[i].font.highlightColor = 'pink';
        }
        
        // Synchronize the document state by executing the queued commands, 
        // and return a promise to indicate task completion.
        return context.sync();
      });  
    })
      .catch(function (error) {
        console.log('Error: ' + JSON.stringify(error));
        if (error instanceof window.OfficeExtension.Error) {
          console.log('Debug info: ' + JSON.stringify(error.debugInfo));
        }
      });
  }

  login() {
    this.state.auth.login();
  }

  logout() {
    this.state.auth.logout();
  }

  renderText() {
    console.log('clicked');
    const that = this;

    window.Office.context.document.getSelectedDataAsync(window.Office.CoercionType.Text, 
      { valueFormat: 'unformatted', filterType: 'all' },
      function (asyncResult) {
        if (asyncResult.status !== window.Office.AsyncResultStatus.Failed) {
          that.setState( {selectedText: asyncResult.value});
        }
      });
  }


  createBindingFromSelection() {
    const that = this;
    window.Office.context.document.bindings.addFromSelectionAsync(window.Office.BindingType.Text, {id: that.state.templateName}, function (asyncResult) {
      console.log({ asyncResult });
    });
  }

  goToBinding(id) {
    window.Office.context.document.goToByIdAsync(id, window.Office.GoToType.Binding);
  }

  get ctoModelForm() {
    const dataTypeOptions = [
      {
        text: 'String',
        value: 'String',
      },
      {
        text: 'Long',
        value: 'Long',
      },
      {
        text: 'Integer',
        value: 'Integer',
      },
      {
        text: 'DateTime',
        value: 'DateTime',
      },
      {
        text: 'Double',
        value: 'Double',
      },
      {
        text: 'Boolean',
        value: 'Boolean',
      },
    ];
    return (
      <div>
        <Header>Create CTO Model</Header>
        <Form>
          {this.state.variableObjs.map((item, index) => {
            console.log({item});
            console.log({dataTypeOptions});
            return (
              <Form.Group key={index}>
                <Label>{item.key}</Label>
                <Dropdown
                  placeholder="Select Data Type"
                  options={dataTypeOptions}
                  onChange={(event, data) => this.handleDataTypeChange(item.key, event, data)}
                />
                <Form.Input
                  type="text"
                  placeholder="Sample input"
                  onChange={(event) => this.handleSampleChange(item.key, event)}
                />
              </Form.Group>
            );
          })}
        </Form>
        <Button onClick={this.handleSubmit}>
          Submit
        </Button>
      </div>
    );
  }

  render() {
    return (
      <div className="app">
        {/* <TopNavigation /> */}
        <Button
          size="tiny"
          onClick={this.renderText}
        >
        Render Selected Text
        </Button>
        { this.state.selectedText }
        { this.state.selectedText &&
          <div className="bindText">
            <Input
              onChange={this.handleChangeName}
              placeholder="Enter a name for your template"
              fluid
              type="text"
            />
            <Button
              size="tiny"
              onClick={this.createBindingFromSelection}
            >
            Create Binding From Selection
            </Button>
          </div>
        }
        { 
          this.state.templateName && 
          <Button
            size="tiny"
            onClick={() => this.goToBinding(this.state.templateName)}
          >
            Go to {this.state.templateName}
          </Button>
        }
        { 
          this.state.selectedText && 
          <Button
            size="tiny"
            onClick={this.extractKeywords}
          >
            Extract Keywords From Selection
          </Button>
        }
        { 
          this.state.variableObjs.map((variableObj, index) => {
            console.log({variableObj});
            return (
              <div key={index}>
                <span>{variableObj.key}</span>
                <Button
                  size="tiny"
                  onClick={() => (this.highlightVars(variableObj))}
                >
                  Highlight all
                </Button>
                <Button
                  size="tiny"
                  onClick={() => (this.createBindingForVar((variableObj)))}
                >
                  Create binding for variable
                </Button>
              </div>
            );
          }) 
        }
        {
          (!!this.state.variables.length) &&
          this.ctoModelForm
        }
      </div>
    );
  }
}

export default App;