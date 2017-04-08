import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import SelfContainedTimer from './components/SelfContainedTimer';

class App extends React.Component {
  render() {
    return <SelfContainedTimer />;
  }
}

export default App;
