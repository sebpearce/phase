import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './TimerMenu.scss';
import Icon from '../Icon';

class TimerMenu extends React.Component {
  render() {
    return (
      <div className={styles.timerMenuContainer}>
        <nav>
          <ul className={styles.menu}>
            <NavLink exact to="/" className={styles.item} activeClassName={styles.selected}>
              <li>
                <Icon id="timer" />
              </li>
            </NavLink>
            <NavLink to="/until" className={styles.item} activeClassName={styles.selected}>
              <li>
                <Icon id="timer-until" />
              </li>
            </NavLink>
            <NavLink to="/stopwatch" className={styles.item} activeClassName={styles.selected}>
              <li>
                <Icon id="stopwatch" />
              </li>
            </NavLink>
          </ul>
        </nav>
      </div>
    );
  }
}

export default TimerMenu;
