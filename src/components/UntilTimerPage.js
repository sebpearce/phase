import React from 'react';
import styles from './UntilTimerPage.scss';
import SimpleInputModal from './SimpleInputModal';
import UntilTimer from './UntilTimer';
import { validateUntilInput } from '../utils/validateInput';
import { convertInputToDate } from '../utils/parseTime';

class UntilTimerPage extends React.Component {
  state = {
    waitingForInput: true,
    input: '',
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.waitingForInput !== this.state.waitingForInput ||
      nextState.input !== this.state.input;
  }

  setInput = e => {
    if (validateUntilInput(e.target.value)) {
      this.setState({ input: e.target.value });
    }
  };

  submitInput = () => {
    this.setState({ waitingForInput: false });
  };

  cancelTimer = () => {
    this.setState({
      waitingForInput: true,
      input: '',
    });
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
      <div className={styles.untilTimerPage}>
        {this.state.waitingForInput
          ? <SimpleInputModal
              question={'Until when?'}
              setInput={this.setInput}
              handleKeyDown={this.handleInputKeyDown}
            />
          : <UntilTimer
              finishAt={convertInputToDate(this.state.input)}
              handleKeyDown={this.handleTimerKeyDown}
            />}
      </div>
    );
  }
}

// UntilTimerPage.defaultProps = {
//   seconds: 1500,
// };
//
// UntilTimerPage.propTypes = {
//   seconds: React.PropTypes.number.isRequired,
//   until: React.PropTypes.string,
// };

export default UntilTimerPage;
