import React from 'react';
import styles from './SimpleInputModal.scss';

class SimpleInputModal extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.question}>{this.props.question}</div>
        <input
          type="text"
          className={styles.input}
          onChange={this.props.setInput}
          onKeyDown={this.props.handleKeyDown}
          autoFocus
        />
      </div>
    );
  }
}

// SimpleInputModal.defaultProps = {
//   seconds: 600,
// };

SimpleInputModal.propTypes = {
  question: React.PropTypes.string.isRequired,
  setInput: React.PropTypes.func.isRequired,
  // onChange: React.PropTypes.func.isRequired,
  // onKeyDown: React.PropTypes.func.isRequired,
};

export default SimpleInputModal;
