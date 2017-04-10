import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import styles from './App.scss';
import IconDefs from './IconDefs';
import TimerMenu from './components/TimerMenu';
import MultiTimerPage from './MultiTimerPage';
import SimpleTimerPage from './components/SimpleTimerPage';

class App extends React.Component {
  render() {
    return (
      <div className={styles.appContainer}>
        <IconDefs />
        <div className={styles.timerMenu}>
          <TimerMenu />
        </div>
        <div className={styles.main}>
          <Route exact path="/" component={SimpleTimerPage} />
          <Route exact path="/stopwatch" component={SimpleTimerPage} />
          <Route exact path="/foo" component={SimpleTimerPage} />
        </div>
        <div className={styles.settingsMenu}>
        </div>
      </div>
    );
  }
}

export default App;
