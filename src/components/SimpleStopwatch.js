import React from 'react';
import styles from './SimpleStopwatch.scss';
import {
  parseMilliseconds,
  parseSeconds,
  parseMinutes,
  parseHours,
} from '../utils/parseTime';
import {
  SecondsDisplay,
  MinutesDisplay,
  HoursDisplay,
  Tick,
} from './TimeDisplay';

const LabelUnderTimer = ({ text }) => {
  return <span className={styles.labelUnderTimer}>{text}</span>;
};

class SimpleStopwatch extends React.Component {
  state = {
    startTime: Date.now(),
    secondsElapsed: 0,
    totalSecondsElapsed: 0,
    paused: false,
    labelText: '',
  };

  componentDidMount() {
    document.addEventListener('keydown', this.props.handleKeyDown);
    document.addEventListener('keydown', this.handleOwnKeyDown);
    this.start();
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
    document.removeEventListener('keydown', this.props.handleKeyDown);
    document.removeEventListener('keydown', this.handleOwnKeyDown);
  }

  handleOwnKeyDown = e => {
    switch (e.keyCode) {
      case 32:
        if (!this.state.paused) {
          this.pause();
        } else {
          this.resume();
        }
        break;
    }
  };

  start = () => {
    clearInterval(this.state.interval);
    const interval = setInterval(this.tick, 200);
    this.setState({ interval, paused: false });
  };

  resume = () => {
    if (this.state.paused) {
      let now = Date.now();
      console.log('now', now);
      this.setState({ startTime: now, labelText: '' }, this.start);
    }
  };

  pause = () => {
    const labelText = 'Paused.';
    clearInterval(this.state.interval);
    this.setState(prevState => {
      return {
        paused: true,
        totalSecondsElapsed: prevState.totalSecondsElapsed +
          prevState.secondsElapsed,
        secondsElapsed: 0,
        labelText,
      };
    });
  };

  // reset = () => {
  //   clearInterval(this.state.interval);
  //   this.setState(
  //     { secondsElapsed: this.props.seconds, finished: false },
  //     this.start
  //   );
  // };

  calculateSecondsBetweenNowAnd = a => {
    return Math.floor((Date.now() - a) / 1000);
  };

  tick = () => {
    if (this.state.paused) return;
    const target = this.calculateSecondsBetweenNowAnd(this.state.startTime);
    console.log('target', target);
    this.setState(prevState => {
      return { secondsElapsed: target };
    });
  };

  render() {
    const secondsElapsed =
      this.state.totalSecondsElapsed + this.state.secondsElapsed;
    console.log('secondsElapsed', secondsElapsed);

    return (
      <div className={styles.simpleTimer}>
        <div className={styles.timeContainer}>
          {secondsElapsed >= 3600 && [
            <HoursDisplay seconds={secondsElapsed} key={'hrs'} />,
            ':',
          ]}
          {secondsElapsed >= 60 && [
            <MinutesDisplay seconds={secondsElapsed} key={'mins'} />,
            ':',
          ]}
          {<SecondsDisplay seconds={secondsElapsed} key={'secs'} />}
        </div>
        <LabelUnderTimer text={this.state.labelText} />
      </div>
    );
  }
}

// SimpleStopwatch.defaultProps = {
//   seconds: 600,
// };
//
// SimpleStopwatch.propTypes = {
//   seconds: React.PropTypes.number.isRequired,
// };

export default SimpleStopwatch;
