import React, { Component } from 'react';
import json from '../public/list.json';
import './Meta.css';

class Meta extends Component {
  constructor (props) {
    super();
    this.state = {
      index: 0,
      time: 0,
      duration: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      index: nextProps.index,
      time: nextProps.time,
      duration: nextProps.duration
    });
  }

  formatTime (time) {
    let minute = Math.floor(time / 60);
    minute = minute > 9 ? minute : '0' + minute;

    let second = Math.floor(time % 60);
    second = second > 9 ? second : '0' + second;
    return `${minute}:${second}`;
  }

  render () {
    return (
      <div className="meta">
        <div className="title">{json.data[this.state.index].song_name}</div>
        <div className="artist">{json.data[this.state.index].artist}</div>
        <div className="time">{this.formatTime(this.state.time)} / {this.formatTime(this.state.duration)}</div>
      </div>
    )
  }
}

export default Meta;
