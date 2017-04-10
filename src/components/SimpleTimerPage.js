import React from 'react';
import styles from './SimpleTimerPage.scss';
import SimpleInputModal from './SimpleInputModal';
import SimpleTimer from './SimpleTimer';

class SimpleTimerPage extends React.Component {
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
          : <SimpleTimer finishAt={Date.now() + 600000} />}
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
