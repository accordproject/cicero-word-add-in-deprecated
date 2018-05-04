import React from 'react';
import { Button } from 'semantic-ui-react';

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
    };

    this.renderText = this.renderText.bind(this);
    this.extractKeywords = this.extractKeywords.bind(this);
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

        // Queue a set of commands to change the font for each found item.
        for (var i = 0; i < searchResults.items.length; i++) {
          searchResults.items[i].font.color = 'purple';
          searchResults.items[i].font.highlightColor = 'pink';
          searchResults.items[i].font.bold = true;
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


  render() {
    return (
      <div className="app">
        This is app
        {/* <TopNavigation /> */}
        <Button
          icon="plus"
          onClick={this.renderText}
        />
        { this.state.selectedText }
        { 
          this.state.selectedText && 
          <Button
            onClick={this.extractKeywords}
          >
            Extract keywords
          </Button>
        }
        { 
          this.state.variables.map((variable) => {
            return (
              <div>
                <span>{variable}</span>
                <Button
                  onClick={() => (this.highlightVars(variable))}
                >
                  Highlight Variable
                </Button>
              </div>
            );
          }) 
        }
      </div>
    );
  }
}

export default App;