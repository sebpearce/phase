import React from 'react';
import styles from './SimpleStopwatchPage.scss';
import SimpleStopwatch from './SimpleStopwatch';
import StopwatchGoButton from './StopwatchGoButton';

class SimpleStopwatchPage extends React.Component {
  state = {
    waitingForInput: true,
    input: '',
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.waitingForInput !== this.state.waitingForInput ||
      nextState.input !== this.state.input
    );
  }

  cancelTimer = () => {
    this.setState({
      waitingForInput: true,
      input: '',
    });
  };

  go = () => {
    this.setState({ waitingForInput: false });
  };

  handleInputKeyDown = e => {
    switch (e.keyCode) {
      case 13:
        this.go();
        break;
    }
  };

  handleTimerKeyDown = e => {
    switch (e.keyCode) {
      case 27:
        this.cancelTimer();
        break;
    }
  };

  handleGoButtonClick = e => {
    this.go();
  }

  render() {
    console.log('rendering page');
    return (
      <div className={styles.simpleTimerPage}>
        {this.state.waitingForInput
          ? <StopwatchGoButton handleClick={this.handleGoButtonClick} />
          : <SimpleStopwatch />}
      </div>
    );
  }
}

// SimpleStopwatchPage.defaultProps = {
//   seconds: 1500,
// };
//
// SimpleStopwatchPage.propTypes = {
//   seconds: React.PropTypes.number.isRequired,
//   until: React.PropTypes.string,
// };

export default SimpleStopwatchPage;
