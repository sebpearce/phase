import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import styles from './App.scss';
import IconDefs from './IconDefs';
import TimerMenu from './components/TimerMenu';
import MultiTimerPage from './MultiTimerPage';
import SimpleTimerPage from './components/SimpleTimerPage';
import UntilTimerPage from './components/UntilTimerPage';

class App extends React.Component {
  state = {
    showTimerMenu: true,
    showCursor: true,
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseleave', this.handleMouseLeave);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseleave', this.handleMouseLeave);
  }

  handleMouseMove = () => {
    if (this.mouseTimeout) clearTimeout(this.mouseTimeout);
    this.setState({ showTimerMenu: true, showCursor: true });

    this.mouseTimeout = setTimeout(() => {
      this.setState({ showTimerMenu: false, showCursor: false })
    }, 2000);
  }

  handleMouseLeave = () => {
    clearTimeout(this.mouseTimeout);
    this.setState({ showTimerMenu: false });
  }

  hideCursor = () => {
    this.setState({ showCursor: false });
  }

  showCursor = () => {
    this.setState({ showCursor: true });
  }

  render() {
    const appClass = this.state.showCursor ? styles.appContainer : styles.appContainerWithHiddenCursor;
    const timerMenuClass = this.state.showTimerMenu ? styles.timerMenuVisible : styles.timerMenuHidden;

    return (
      <div className={appClass}>
        <IconDefs />
        <div className={timerMenuClass}>
          <TimerMenu />
        </div>
        <div className={styles.main}>
          <Route exact path="/" component={SimpleTimerPage} />
          <Route path="/until" component={UntilTimerPage} />
          <Route path="/foo" component={SimpleTimerPage} />
        </div>
        <div className={styles.settingsMenu}>
        </div>
      </div>
    );
  }
}

export default App;
