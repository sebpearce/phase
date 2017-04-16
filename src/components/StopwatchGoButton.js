import React from 'react';
import styles from './StopwatchGoButton.scss';

const StopwatchGoButton = ({ handleClick }) => {
  return (
    <button className={styles.stopwatchGoButton} onClick={handleClick}>
      GO
    </button>
  )
}

export default StopwatchGoButton;
