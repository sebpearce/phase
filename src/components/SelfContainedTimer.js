import React from 'react';
import styles from './SelfContainedTimer.scss';
import { parseSeconds, parseMinutes, parseHours } from '../utils/parseTime';

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

class SelfContainedTimer extends React.Component {
  state = {
    secondsLeft: this.props.seconds,
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
    if (this.state.paused && this.state.secondsLeft > 0) this.start();
  };

  pause = () => {
    clearInterval(this.state.interval);
    this.setState({ paused: true });
  };

  reset = () => {
    clearInterval(this.state.interval);
    this.setState({ secondsLeft: this.props.seconds }, this.start);
  };

  tick = () => {
    const target = this.state.secondsLeft - 1;
    if (target >= 0) {
      this.setState({ secondsLeft: target });
    } else {
      this.pause();
    }
  };
  
  render() {
    return (
      <div className={styles.selfContainedTimer}>
        <HoursDisplay seconds={this.state.secondsLeft} />:
        <MinutesDisplay seconds={this.state.secondsLeft} />:
        <SecondsDisplay seconds={this.state.secondsLeft} />

        <button onClick={this.pause}>PAUSE</button>
        <button onClick={this.resume}>RESUME</button>
        <button onClick={this.reset}>RESET</button>
        <button onClick={this.props.kill}>KILL</button>
      </div>
    );
  }
}

SelfContainedTimer.defaultProps = {
  seconds: 7200,
};

SelfContainedTimer.propTypes = {
  seconds: React.PropTypes.number.isRequired,
};

export default SelfContainedTimer;
