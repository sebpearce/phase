import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App.js', () => {
    const NextRootContainer = require('./App.js').default;
    render(<NextRootContainer />, document.getElementById('root'));
  });
}
