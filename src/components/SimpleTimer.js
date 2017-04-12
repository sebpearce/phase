import React from 'react';
import styles from './SimpleTimer.scss';
import { parseSeconds, parseMinutes, parseHours } from '../utils/parseTime';
import { SecondsDisplay, MinutesDisplay, HoursDisplay, Tick  } from './TimeDisplay';
import { Howl } from 'howler';
import beep from '../static/beep.mp3';

const LabelUnderTimer = ({ text }) => {
  return <span className={styles.labelUnderTimer}>{text}</span>;
};

class SimpleTimer extends React.Component {
  state = {
    secondsLeft: this.props.seconds,
    paused: false,
    finished: false,
    labelText: '',
  };

  componentDidMount() {
    document.addEventListener('keydown', this.props.handleKeyDown);
    document.addEventListener('keydown', this.handleOwnKeyDown);
    this.beep = new Howl({ src: beep });
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
    const interval = setInterval(this.tick, 1000);
    this.setState({ interval, paused: false, labelText: '' });
  };

  resume = () => {
    if (this.state.paused && this.state.secondsLeft > 0) {
      this.start();
    }
  };

  pause = () => {
    console.log('this.state.finished', this.state.finished);
    const labelText = this.state.finished ? 'Finished.' : 'Paused.';
    clearInterval(this.state.interval);
    this.setState({ paused: true, labelText });
  };

  reset = () => {
    clearInterval(this.state.interval);
    this.setState(
      { secondsLeft: this.props.seconds, finished: false },
      this.start
    );
  };

  finish = () => {
    this.setState({ finished: true }, this.pause);
    this.beep.play();
  };

  tick = () => {
    if (this.state.paused) return;
    const target = this.state.secondsLeft - 1;
    this.setState({ secondsLeft: target });
    if (target <= 0) {
      this.finish();
    }
  };

  render() {
    return (
      <div className={styles.simpleTimer}>
        <div className={styles.timeContainer}>
          {this.state.secondsLeft >= 3600 && [
            <HoursDisplay seconds={this.state.secondsLeft} key={'hrs'} />,
            ':',
          ]}
          {this.state.secondsLeft >= 60 && [
            <MinutesDisplay seconds={this.state.secondsLeft} key={'mins'} />,
            ':',
          ]}
          {this.state.finished
            ? <Tick />
            : <SecondsDisplay seconds={this.state.secondsLeft} key={'secs'} />}
        </div>
        {/* <button onClick={this.pause}>PAUSE</button>
        <button onClick={this.resume}>RESUME</button>
        <button onClick={this.reset}>RESET</button>
        <button onClick={this.props.kill}>KILL</button> */}
        <LabelUnderTimer text={this.state.labelText} />
      </div>
    );
  }
}

SimpleTimer.defaultProps = {
  seconds: 600,
};

SimpleTimer.propTypes = {
  seconds: React.PropTypes.number.isRequired,
};

export default SimpleTimer;
