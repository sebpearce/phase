import React from 'react';

class SelfContainedTimer extends React.Component {
  state = {
    secondsLeft: this.props.seconds,
  }

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
  }

  render() {
    return (
      <div>{this.state.secondsLeft}</div>
    );
  }
}

SelfContainedTimer.defaultProps = {
  seconds: 5
}

SelfContainedTimer.propTypes = {
  seconds: React.PropTypes.number.isRequired
}

export default SelfContainedTimer;
