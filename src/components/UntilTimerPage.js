import React from 'react';
import styles from './UntilTimerPage.scss';
import SimpleInputModal from './SimpleInputModal';
import UntilTimer from './UntilTimer';

class UntilTimerPage extends React.Component {
  state = {
    waitingForInput: true,
    input: '',
  };

  componentDidMount() {}

  componentWillUnmount() {}

  setInput = e => {
    if (this.validate(e.target.value)) {
      this.setState({ input: e.target.value });
    }
  };

  convertInputToDate = input => {
    const now = new Date();
    const [y, m, d] = [now.getFullYear(), now.getMonth(), now.getDate()];
    const time = input.split(/[:.]/);
    const date = new Date(y, m, d, ...time);
    return date < now ? new Date(y, m, d + 1, ...time) : date;
  };
  
  submitInput = () => {
    this.setState({ waitingForInput: false });
  }

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.submitInput();
    }
  };

  validate = input => {
    // note: only for until, not countdown (e.g. 34:50 not ok but 23:59 ok)
    const untilFormat = /^(([01]?[0-9]|2[0-3])[:.][0-5][0-9]|[0-5]?[0-9])$/;
    const countdownFormat = /^((\d+\s?h(r|rs|ours?)?)?\s?(\d+\s?m(ins?|inutes?)?)?\s?(\d+\s?s(ecs?|econds?)?)?|\d+(:(0[1-9]|[1-5]\d))?(:(0[1-9]|[1-5]\d))?)$/;
    console.log(input, untilFormat.test(input) && 'ok');
    return untilFormat.test(input);
  };

  render() {
    return (
      <div className={styles.simpleTimerPage}>
        {this.state.waitingForInput
          ? <SimpleInputModal
              question={'Until when?'}
              setInput={this.setInput}
              handleKeyDown={this.handleKeyDown}
            />
          : <UntilTimer finishAt={this.convertInputToDate(this.state.input)} />}
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
