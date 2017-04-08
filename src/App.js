import React from 'react';
import ReactDOM from 'react-dom';
import styles from './App.scss';
import SelfContainedTimer from './components/SelfContainedTimer';

class App extends React.Component {
  state = {
    idCounter: 0,
    timers: [],
  };

  incrementCounter = () => {
    this.setState(prevState => {
      return {
        idCounter: prevState.idCounter + 1,
      };
    });
  };

  createTimer = seconds => {
    const id = this.state.idCounter;
    this.setState(
      prevState => {
        return {
          timers: [...prevState.timers, { id: id, seconds: seconds }],
        };
      },
      this.incrementCounter
    );
  };

  makeKillTimerFn = id => {
    const timers = this.state.timers;
    return () => {
      this.setState({
        timers: timers.filter(t => t.id !== id),
      });
    };
  };

  render() {
    return (
      <div className={styles.appContainer}>
        {this.state.timers.map(t => (
          <SelfContainedTimer
            key={t.id}
            seconds={t.seconds}
            kill={this.makeKillTimerFn(t.id)}
          />
        ))}
        <button
          onClick={() => {
            this.createTimer(400);
          }}
        >
          MAKE NEW TIMER
        </button>
      </div>
    );
  }
}

export default App;
