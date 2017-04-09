import React from 'react';
import ReactDOM from 'react-dom';
import styles from './MultiTimerPage.scss';
import SelfContainedTimer from './components/SelfContainedTimer';
import SelfContainedStopwatch from './components/SelfContainedStopwatch';

class MultiTimerPage extends React.Component {
  state = {
    idCounter: 3,
    timepieces: [
      {
        id: 1,
        seconds: 5,
        type: 'timer',
      },
      {
        id: 2,
        type: 'stopwatch',
      },
    ],
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
          timepieces: [
            ...prevState.timepieces,
            { id: id, seconds: seconds, type: 'timer' },
          ],
        };
      },
      this.incrementCounter
    );
  };

  createStopwatch = seconds => {
    const id = this.state.idCounter;
    let newStopwatch = { id: id, type: 'stopwatch' };
    if (seconds) {
      newStopwatch = { ...newStopwatch, limit: seconds };
    }
    this.setState(
      prevState => {
        return {
          timepieces: [...prevState.timepieces, newStopwatch],
        };
      },
      this.incrementCounter
    );
  };

  makeKillTimepieceFn = id => {
    const timepieces = this.state.timepieces;
    return () => {
      this.setState({
        timepieces: timepieces.filter(t => t.id !== id),
      });
    };
  };

  render() {
    return (
      <div className={styles.multiTimerPageContainer}>
        <button
          onClick={() => {
            this.createStopwatch();
          }}
        >
          MAKE NEW STOPWATCH
        </button><br />
        <button
          onClick={() => {
            this.createStopwatch(5);
          }}
        >
          MAKE NEW STOPWATCH WITH 5s LIMIT
        </button><br />
        <button
          onClick={() => {
            this.createTimer(600);
          }}
        >
          MAKE NEW TIMER
        </button>
        {/* <pre>{JSON.stringify(this.state.timepieces, null, '  ')}</pre> */}
        {this.state.timepieces.map(t => {
          if (t.type === 'timer') {
            return (
              <SelfContainedTimer
                key={t.id}
                seconds={t.seconds}
                kill={this.makeKillTimepieceFn(t.id)}
              />
            );
          } else if (t.type === 'stopwatch') {
            return (
              <SelfContainedStopwatch
                key={t.id}
                limit={t.limit}
                kill={this.makeKillTimepieceFn(t.id)}
              />
            );
          }
        })}
      </div>
    );
  }
}

export default MultiTimerPage;
