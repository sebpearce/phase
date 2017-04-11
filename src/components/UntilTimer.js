import React from 'react';
import styles from './UntilTimer.scss';
import {
  parseSeconds,
  parseMinutes,
  parseHours,
  convertUnixTime,
} from '../utils/parseTime';

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

const UntilDisplay = ({ finishAt, isFinished }) => {
  const adverb = isFinished ? 'since' : 'until';
  const result = new Date(finishAt).get;
  const className = isFinished
    ? styles.untilDisplayFinished
    : styles.untilDisplay;
  return (
    <span className={className}>
      {adverb + ' ' + convertUnixTime(finishAt)}
    </span>
  );
};

class UntilTimer extends React.Component {
  state = {
    secondsLeft: this.calculateSecondsLeft(this.props.finishAt),
    finished: false,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.props.handleKeyDown);
    this.start();
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
    document.removeEventListener('keydown', this.props.handleKeyDown);
  }

  calculateSecondsLeft(finishAt) {
    return parseInt((finishAt - Date.now()) / 1000, 10);
  }

  calculateSecondsSince(finishAt) {
    return parseInt((Date.now() - finishAt) / 1000, 10);
  }

  start = () => {
    clearInterval(this.state.interval);
    const interval = setInterval(this.tick, 200);
    this.setState({ interval, finished: false });
  };

  tick = () => {
    const finishAt = this.props.finishAt;
    let target;
    if (this.state.finished) {
      target = this.calculateSecondsSince(finishAt);
    } else {
      target = this.calculateSecondsLeft(finishAt);
    }
    this.setState({ secondsLeft: target });

    if (finishAt <= Date.now()) {
      if (!this.state.finished) {
        this.setState({ finished: true });
      }
    }
  };

  render() {
    const className = this.state.finished
      ? styles.timeContainerFinished
      : styles.timeContainer;
    return (
      <div className={styles.untilTimer}>
        <div className={className}>
          {this.state.secondsLeft >= 3600 && [
            <HoursDisplay seconds={this.state.secondsLeft} key={'hrs'} />,
            ':',
          ]}
          {this.state.secondsLeft >= 60 && [
            <MinutesDisplay seconds={this.state.secondsLeft} key={'mins'} />,
            ':',
          ]}
          <SecondsDisplay seconds={this.state.secondsLeft} key={'secs'} />
        </div>
        <UntilDisplay
          finishAt={this.props.finishAt}
          isFinished={this.state.finished}
        />
      </div>
    );
  }
}

UntilTimer.defaultProps = {
  finishAt: Date.now() + 600000,
};

UntilTimer.propTypes = {
  finishAt: React.PropTypes.instanceOf(Date).isRequired,
};

export default UntilTimer;
