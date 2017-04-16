import React from 'react';
import styles from './SimpleStopwatch.scss';
import { parseMilliseconds, parseSeconds, parseMinutes, parseHours } from '../utils/parseTime';
import {
  SecondsDisplay,
  MinutesDisplay,
  HoursDisplay,
  Tick,
} from './TimeDisplay';

// const LabelUnderTimer = ({ text }) => {
//   return <span className={styles.labelUnderTimer}>{text}</span>;
// };

const MillisecondsDisplay = ({ ms }) => {
  return <span className={styles.MillisecondsDisplay}>{parseMilliseconds(ms)}</span>;
};

class SimpleStopwatch extends React.Component {
  state = {
    msElapsed: 0,
    paused: false,
    finished: false,
    // labelText: '',
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
    const interval = setInterval(this.tick, 100);
    this.setState({ interval, paused: false });
    // this.setState({ interval, paused: false, labelText: '' });
  };

  resume = () => {
    if (this.state.paused) {
      this.start();
    }
  };

  pause = () => {
    // const labelText = this.state.finished ? 'Finished.' : 'Paused.';
    clearInterval(this.state.interval);
    this.setState({ paused: true });
    // this.setState({ paused: true, labelText });
  };

  // reset = () => {
  //   clearInterval(this.state.interval);
  //   this.setState(
  //     { msElapsed: this.props.seconds, finished: false },
  //     this.start
  //   );
  // };

  finish = () => {
    this.setState({ finished: true }, this.pause);
    // this.beep.play();
  };

  tick = () => {
    if (this.state.paused) return;
    const target = this.state.msElapsed + 100;
    this.setState({ msElapsed: target });
  };

  render() {
    const secondsElapsed = parseInt(this.state.msElapsed / 1000);
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
          {/* {[<SecondsDisplay seconds={secondsElapsed} key={'secs'} />, '.']} */}
          {<MillisecondsDisplay ms={this.state.msElapsed} key={'ms'} />}
        </div>
        {/* <LabelUnderTimer text={this.state.labelText} /> */}
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
