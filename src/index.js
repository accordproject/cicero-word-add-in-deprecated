import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppContainer } from "react-hot-loader";
import registerServiceWorker from './registerServiceWorker';

const Office = window.Office;

let isOfficeInitialized = false;

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component isOfficeInitialized={isOfficeInitialized} />
    </AppContainer>,
    document.getElementById("root")
  );
};

Office.initialize = () => {
  isOfficeInitialized = true;
  render(App);
  registerServiceWorker();
};

render(App);

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    render(NextApp);
  });
}
