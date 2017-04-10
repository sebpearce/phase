import React from 'react';
import styles from './UntilTimerPage.scss';
import SimpleInputModal from './SimpleInputModal';
import UntilTimer from './UntilTimer';

class UntilTimerPage extends React.Component {
  state = {
    waitingForInput: false,
    input: ''
  };

  componentDidMount() {}
  
  componentWillUnmount() {}
  
  render() {
    return (
      <div className={styles.simpleTimerPage}>
        {this.state.waitingForInput
          ? <SimpleInputModal />
          : <UntilTimer finishAt={Date.now() + 800000} />}
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
