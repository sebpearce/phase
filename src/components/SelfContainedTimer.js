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
  };

  componentDidMount() {
    const interval = setInterval(this.tick, 1000);
    this.setState({ interval });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  tick = () => {
    const target = this.state.secondsLeft - 1;
    if (target >= 0) {
      this.setState({ secondsLeft: target });
    } else {
      clearInterval(this.state.interval);
    }
  };

  render() {
    return (
      <div className={styles.selfContainedTimer}>
        <HoursDisplay seconds={this.state.secondsLeft} />:
        <MinutesDisplay seconds={this.state.secondsLeft} />:
        <SecondsDisplay seconds={this.state.secondsLeft} />
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
