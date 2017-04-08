import React from 'react';
import styles from './SelfContainedStopwatch.scss';
import { parseSeconds, parseMinutes, parseHours } from '../utils/parseTime';
import Icon from '../Icon';

const SecondsDisplay = ({ seconds }) => {
  return (
    <span className={styles.seconds}>
      {parseSeconds(seconds)}
    </span>
  );
};

const MinutesDisplay = ({ seconds }) => {
  return (
    <span className={styles.minutes}>
      {parseMinutes(seconds)}
    </span>
  );
};

const HoursDisplay = ({ seconds }) => {
  return (
    <span className={styles.hours}>
      {parseHours(seconds)}
    </span>
  );
};

class SelfContainedStopwatch extends React.Component {
  state = {
    secondsElapsed: 0,
    paused: false,
  };

  componentDidMount() {
    this.start();
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  start = () => {
    clearInterval(this.state.interval);
    const interval = setInterval(this.tick, 1000);
    this.setState({ interval, paused: false });
  };

  resume = () => {
    if (
      this.state.paused &&
      (!this.props.limit || this.state.secondsElapsed < this.props.limit)
    )
      this.start();
  };

  pause = () => {
    clearInterval(this.state.interval);
    this.setState({ paused: true });
  };

  reset = () => {
    clearInterval(this.state.interval);
    this.setState({ secondsElapsed: 0 }, this.start);
  };

  tick = () => {
    const target = this.state.secondsElapsed + 1;
    if (this.props.limit && target > this.props.limit) {
      this.pause();
    } else {
      this.setState({ secondsElapsed: target });
    }
  };

  render() {
    return (
      <div className={styles.timepiece}>
        <div className={styles.iconContainer}>
          <Icon id='stopwatch' />
        </div>
        <div className={styles.timeContainer}>
          <HoursDisplay seconds={this.state.secondsElapsed} />:
          <MinutesDisplay seconds={this.state.secondsElapsed} />:
          <SecondsDisplay seconds={this.state.secondsElapsed} />
        </div>
        <button onClick={this.pause}>PAUSE</button>
        <button onClick={this.resume}>RESUME</button>
        <button onClick={this.reset}>RESET</button>
        <button onClick={this.props.kill}>KILL</button>
      </div>
    );
  }
}

// SelfContainedStopwatch.defaultProps = {
//   seconds: 7200,
// };

// SelfContainedStopwatch.propTypes = {
//   seconds: React.PropTypes.number.isRequired,
// };

export default SelfContainedStopwatch;
