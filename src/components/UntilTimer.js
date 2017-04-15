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

const UntilDisplay = (
  { finishAt, isFinished, isFirstMinuteAfterFinishing }
) => {
  const adverb = isFirstMinuteAfterFinishing
    ? 'Finished.'
    : isFinished ? 'since' : 'until';
  const result = new Date(finishAt).get;
  const className = isFinished
    ? styles.untilDisplayFinished
    : styles.untilDisplay;
  let text = adverb;
  if (!isFirstMinuteAfterFinishing) text += ' ' + convertUnixTime(finishAt);
  return (
    <span className={className}>
      {text}
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
    console.log('DID MOUNT!');
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
    const target = this.calculateSecondsLeft(
      this.props.finishAt,
      !this.state.finished
    );
    this.setState({ secondsLeft: target });

    if (target === 0) {
      if (!this.state.finished) {
        this.setState({ finished: true });
        this.beep.play();
      }
    }
  };

  render() {
    const isFirstMinuteAfterFinishing = this.state.secondsLeft >= -59 &&
      this.state.secondsLeft <= 0;

    const className = this.state.secondsLeft <= -60
      ? styles.timeContainerFinished
      : styles.timeContainer;

    return (
      <div className={styles.untilTimer}>
        <div className={className}>
          {Math.abs(this.state.secondsLeft) >= 3600 && [
            <HoursDisplay seconds={this.state.secondsLeft} key={'hrs'} />,
            ':',
          ]}
          {Math.abs(this.state.secondsLeft) >= 60 && [
            <MinutesDisplay seconds={this.state.secondsLeft} key={'mins'} />,
            ':',
          ]}
          {isFirstMinuteAfterFinishing
            ? <Tick />
            : <SecondsDisplay seconds={this.state.secondsLeft} key={'secs'} />}
        </div>
        <UntilDisplay
          finishAt={this.props.finishAt}
          isFinished={this.state.finished}
          isFirstMinuteAfterFinishing={isFirstMinuteAfterFinishing}
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
