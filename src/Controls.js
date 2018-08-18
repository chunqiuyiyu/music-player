import React, { Component } from 'react';
import './Controls.css';
import playIcon from './icons/play.svg'
import pauseIcon from './icons/pause.svg'

class Controls extends Component {
  constructor (props) {
    super();
    this.state = {
      isPlayMusic: true,
      index: props.index
    }
  }
  onControl () {
    let tmp = !this.state.isPlayMusic;
    this.setState({
      isPlayMusic: tmp
    });

    this.props.callbackParent(tmp);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.index !== this.state.index) {
      this.setState({
        isPlayMusic: true,
        index: nextProps.index
      });
    }
  }

  render () {
    return (
      <div className="control">
        <div className="control-play" onClick={this.onControl.bind(this)}>
          {
            this.state.isPlayMusic ?
            <div style={{background: `url(${pauseIcon}) no-repeat`}}></div> :
            <div style={{background: `url(${playIcon}) no-repeat`}}></div>
          }
        </div>
      </div>
    );
  }
}

export default Controls;
