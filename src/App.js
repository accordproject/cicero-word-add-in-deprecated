import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import CtoModelModal from './CtoModelModal';

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
    };

    this.renderText = this.renderText.bind(this);
    this.extractKeywords = this.extractKeywords.bind(this);
    this.highlightVars = this.highlightVars.bind(this);
    this.createBindingFromSelection = this.createBindingFromSelection.bind(this);  
    this.handleChangeName = this.handleChangeName.bind(this);
    this.goToBinding = this.goToBinding.bind(this);  
  }

  componentDidMount() {
    // this.login();
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

  extractKeywords() {
    console.log('clicked');
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

      variables.push({key: m[1], type: 'String'});
    }

    that.setState({variableObjs: variables.map((varObj) => (varObj))});
    that.setState({variables: variables.map((varObj) => (varObj.key))});
  }

  highlightVars(variable) {
    // Run a batch operation against the Word object model.
    window.Word.run(function (context) {
      // Queue a command to search the document with a wildcard
      var searchResults = context.document.body.search(variable, {matchWildCards: true});

      // Queue a command to load the search results and get the font property values.
      context.load(searchResults, 'font');
      
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
          contentControl.title = variable;
          console.log({contentControl});
          searchResults.items[i].font.highlightColor = 'pink';
          // searchResults.items[i].font.bold = true;
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

  handleChangeName(event) {
    this.setState({templateName: event.target.value});
  }

  createBindingFromSelection() {
    const that = this;
    window.Office.context.document.bindings.addFromSelectionAsync(window.Office.BindingType.Text, {id: that.state.templateName}, function (asyncResult) {
      console.log({ asyncResult });
    });
  }

  createBindingForVar(varName) {
    window.Office.context.document.bindings.addFromNamedItemAsync(varName, window.Office.BindingType.Text, function (asyncResult) {
      console.log({ asyncResult });
    });
  }

  goToBinding(id) {
    window.Office.context.document.goToByIdAsync(id, window.Office.GoToType.Binding);
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
          this.state.variables.map((variable, index) => {
            return (
              <div key={index}>
                <span>{variable}</span>
                <Button
                  size="tiny"
                  onClick={() => (this.highlightVars(variable))}
                >
                  Highlight Variable
                </Button>
                <Button
                  size="tiny"
                  onClick={() => (this.createBindingForVar(variable))}
                >
                  Create binding for variable
                </Button>
              </div>
            );
          }) 
        }
        {
          (!!this.state.variables.length) &&
          <CtoModelModal
            variables={this.state.variableObjs}
          />
        }
      </div>
    );
  }
}

export default App;