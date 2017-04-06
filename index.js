import React from 'react';
import { render } from 'react-dom';
import App from './App.js';

render(
  <App />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App.js', () => {
    const NextRootContainer = require('./App.js').default;
    render(<NextRootContainer />, document.getElementById('root'));
  });
}
