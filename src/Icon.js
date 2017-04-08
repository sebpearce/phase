import React from 'react';
import styles from './Icon.scss';

const Icon = props => {
  return (
    <svg className={styles.Icon}>
      <use xlinkHref={`#${props.id}`} />
    </svg>
  );
};

export default Icon;
