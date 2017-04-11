import React from 'react';
import styles from './SimpleTimerPage.scss';
import SimpleInputModal from './SimpleInputModal';
import SimpleTimer from './SimpleTimer';

class SimpleTimerPage extends React.Component {
  state = {
    waitingForInput: true,
    input: '',
  };

  componentDidMount() {}

  componentWillUnmount() {}

  setInput = e => {
    if (this.validate(e.target.value)) {
      this.setState({ input: e.target.value });
      this.convertInputToNumber(e.target.value);
    }
  };

  parseInputAsDigital = (input) => {
    const t = input.split(/[:.]/);
    const startingIndex = Math.abs((t.length - 3) % 3);
    const factors = [3600, 60, 1];
    return t.reduce((total, val, i) => {
      return total + (val * factors[i + startingIndex]);
    }, 0);
  }

  getNumberFromMatch(match) {
    return (match && match.length > 1) ? parseInt(match[1], 10) : 0;
  }

  parseInputAsHuman = (input) => {
    let h, m, s = 0;
    h = /(\d+)\s*(?:h(?:r|rs|ours?)?)/i.exec(input);
    const hours = this.getNumberFromMatch(h);
    m = /(\d+)\s*(?:m(?:ins?|inutes?)?)/i.exec(input);
    const minutes = this.getNumberFromMatch(m);
    s = /(\d+)\s*(?:s(ecs?|econds?)?)/i.exec(input);
    const seconds = this.getNumberFromMatch(s);
    return hours * 3600 + minutes * 60 + seconds;
  };

  convertInputToNumber = input => {
    let result;
    if (/[:.]/.test(input) || /^\s*\d+\s*$/.test(input)) {
      result = this.parseInputAsDigital(input);
    } else {
      result = this.parseInputAsHuman(input);
    }
    return result;
  };

  submitInput = () => {
    this.setState({ waitingForInput: false });
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.submitInput();
    }
  };

  validate = input => {
    const countdownFormat = /^((\d+\s?h(r|rs|ours?)?)?\s*?(\d+\s?m(ins?|inutes?)?)?\s*(\d+\s?s(ecs?|econds?)?)?|\d+(:(0[0-9]|[1-5]\d))?(:(0[0-9]|[1-5]\d))?)$/i;
    console.log(input, countdownFormat.test(input) && 'ok');
    return countdownFormat.test(input);
  };

  render() {
    return (
      <div className={styles.simpleTimerPage}>
        {this.state.waitingForInput
          ? <SimpleInputModal
              question={'How long?'}
              setInput={this.setInput}
              handleKeyDown={this.handleKeyDown}
            />
          : <SimpleTimer seconds={this.convertInputToNumber(this.state.input)} />}
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
