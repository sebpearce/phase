import React from 'react';
import styles from './SimpleTimerPage.scss';
import SimpleInputModal from './SimpleInputModal';
import SimpleTimer from './SimpleTimer';
import { convertInputToNumber } from '../utils/parseTime';
import { validateCountdownInput } from '../utils/validateInput';

class SimpleTimerPage extends React.Component {
  state = {
    waitingForInput: true,
    input: '',
  };

  // TODO: Tests for helpers
  // TODO: Handle untilTimer after it hits target time ("since" and go darker)

  setInput = e => {
    if (validateCountdownInput(e.target.value)) {
      this.setState({ input: e.target.value });
      convertInputToNumber(e.target.value);
    }
  };

  cancelTimer = () => {
    this.setState({
      waitingForInput: true,
      input: '',
    });
  };

  submitInput = () => {
    this.setState({ waitingForInput: false });
  };

  handleInputKeyDown = e => {
    switch (e.keyCode) {
      case 13:
        this.submitInput();
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

  render() {
    return (
      <div className={styles.simpleTimerPage}>
        {this.state.waitingForInput
          ? <SimpleInputModal
              question={'How long?'}
              setInput={this.setInput}
              handleKeyDown={this.handleInputKeyDown}
            />
          : <SimpleTimer
              seconds={convertInputToNumber(this.state.input)}
              handleKeyDown={this.handleTimerKeyDown}
            />}
      </div>
    );
  }
}

// SimpleTimerPage.defaultProps = {
//   seconds: 1500,
// };
//
// SimpleTimerPage.propTypes = {
//   seconds: React.PropTypes.number.isRequired,
//   until: React.PropTypes.string,
// };

export default SimpleTimerPage;
