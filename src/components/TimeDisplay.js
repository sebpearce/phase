import React from 'react';
import styles from './_timeDisplay.scss';
import {
  parseSeconds,
  parseMinutes,
  parseHours,
  // convertUnixTime,
} from '../utils/parseTime';

export const SecondsDisplay = ({ seconds }) => {
  return (
    <span className={styles.seconds}>
      {parseSeconds(seconds)}
    </span>
  );
};

export const MinutesDisplay = ({ seconds }) => {
  return (
    <span className={styles.minutes}>
      {parseMinutes(seconds)}
    </span>
  );
};

export const HoursDisplay = ({ seconds }) => {
  return (
    <span className={styles.hours}>
      {parseHours(seconds)}
    </span>
  );
};

export const Tick = () => {
  return <span className={styles.tick}>✓</span>;
};
