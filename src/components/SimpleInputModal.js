import React from 'react';
import styles from './SimpleInputModal.scss';

class SimpleInputModal extends React.Component {
  // state = {
  //   secondsLeft: this.props.finishAt - Date.now(),
  //   paused: false,
  //   finished: false,
  // };
  //

  render() {
    return (
      <div className={styles.simpleInputModal}>
      </div>
    );
  }
}

// SimpleInputModal.defaultProps = {
//   seconds: 600,
// };

SimpleInputModal.propTypes = {
  question: React.PropTypes.string.isRequired,
  getInput: React.PropTypes.func.isRequired,
};

export default SimpleInputModal;
