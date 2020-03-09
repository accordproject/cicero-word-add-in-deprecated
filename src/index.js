import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//Always boot strap the root Component in Office.initialize
window.Office.initialize = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();
};
