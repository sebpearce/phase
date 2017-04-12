import React from 'react';
import styles from './UntilTimer.scss';
import {
  parseSeconds,
  parseMinutes,
  parseHours,
  convertUnixTime,
} from '../utils/parseTime';
import { Howl } from 'howler';
import beep from '../static/beep.mp3';
import {
  SecondsDisplay,
  MinutesDisplay,
  HoursDisplay,
  Tick,
} from './TimeDisplay';

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
    this.beep = new Howl({ src: beep });
    this.start();
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
    document.removeEventListener('keydown', this.props.handleKeyDown);
  }

  calculateSecondsLeft(finishAt) {
    return parseInt((finishAt - Date.now()) / 1000, 10);
  }

  start = () => {
    clearInterval(this.state.interval);
    const interval = setInterval(this.tick, 200);
    this.setState({ interval, finished: false });
  };

  tick = () => {
    const target = this.calculateSecondsLeft(this.props.finishAt);
    this.setState({ secondsLeft: target });

    if (target === 0) {
      if (!this.state.finished) {
        this.setState({ finished: true });
        this.beep.play();
      }
    }
  };

  render() {
    const className = this.state.secondsLeft < 0
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
          {this.state.secondsLeft === 0
            ? <Tick />
            : <SecondsDisplay seconds={this.state.secondsLeft} key={'secs'} />}
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
