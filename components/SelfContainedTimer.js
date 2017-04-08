import React from 'react';

class SelfContainedTimer extends React.Component {
  state = {
    count: 2
  }
  
  render() {
    return (
      <div>{this.state.count}</div>
    );
  }
}

export default SelfContainedTimer;
