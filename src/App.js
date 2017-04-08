import React from 'react';
import ReactDOM from 'react-dom';
import styles from './App.scss';
import SelfContainedTimer from './components/SelfContainedTimer';

class App extends React.Component {
  render() {
    return (
      <div className={styles.appContainer}>
        <SelfContainedTimer seconds={500} />
      </div>
    );
  }
}

export default App;
