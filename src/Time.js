import React, {Component} from 'react';
import './Time.css';

class Time extends Component {
  constructor(props) {
    super();
    this.state = {
      width: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      width: nextProps.time/nextProps.duration * 100
    });
  }

  render() {
    return (
      <div className="timeline">
        <div className="timeline-passed" style={{width: `${this.state.width}%`}}></div>
      </div>
    );
  }
}

export default Time;
