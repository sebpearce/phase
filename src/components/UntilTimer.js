import React from 'react';
import styles from './SimpleTimer.scss';
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

class UntilTimer extends React.Component {
  state = {
    secondsLeft: this.calculateSecondsLeft(this.props.finishAt),
    finished: false,
  };

  componentDidMount() {
    this.start();
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  calculateSecondsLeft(finishAt) {
    return parseInt((finishAt - Date.now()) / 1000, 10);
  }

  start = () => {
    clearInterval(this.state.interval);
    const interval = setInterval(this.tick, 200);
    this.setState({ interval });
  };

  tick = () => {
    const target = this.calculateSecondsLeft(this.props.finishAt);
    this.setState({ secondsLeft: target });
    if (target <= 0) {
      this.setState({ finished: true });
      this.pause();
    }
  };

  render() {
    return (
      <div className={styles.simpleTimer}>
        <div className={styles.timeContainer}>
          {this.state.secondsLeft >= 3600 && [
            <HoursDisplay seconds={this.state.secondsLeft} />,
            ':',
          ]}
          {this.state.secondsLeft >= 60 && [
            <MinutesDisplay seconds={this.state.secondsLeft} />,
            ':',
          ]}
          <SecondsDisplay seconds={this.state.secondsLeft} />
        </div>
      </div>
    );
  }
}

UntilTimer.defaultProps = {
  finishAt: Date.now() + 600000,
};

UntilTimer.propTypes = {
  finishAt: React.PropTypes.number.isRequired,
};

export default UntilTimer;
