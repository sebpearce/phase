import React from 'react';

class Timer extends React.Component {
  state = {
    secondsLeft: this.props.seconds,
    paused: false,
    finished: false,
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
    this.setState(
      { secondsLeft: this.props.seconds, finished: false },
      this.start
    );
  };

  tick = () => {
    const target = this.state.secondsLeft - 1;
    this.setState({ secondsLeft: target });
    if (target <= 0) {
      this.setState({ finished: true });
      this.pause();
    }
  };

  render() {
    return null
  }
}

Timer.defaultProps = {
  seconds: 1500,
};

Timer.propTypes = {
  seconds: React.PropTypes.number.isRequired,
  id: React.PropTypes.number.isRequired,
  until: React.PropTypes.string,
};

export default Timer;
