import React, {Component} from 'react';
import './Lrc.css';

class Lrc extends Component {
  constructor(props) {
    super();
    this.state = {
      lrcs: [],
      currentIndex: 0,
      name: props.name
    }
  }

  fetchLrc(name) {
    fetch(`musics/${name}.lrc`).then((res) => {
      if (res.ok) {
        res.text().then((data) => {
          this.insertLrc(data.split('\n'));
        })
      }
    })
  }

  insertLrc(txtArr) {
    let time, seconds, splitIndex;
    let lrcs = [];

    for (let item of txtArr) {
      if (/\[(\d{2}.){3}/.test(item)) {
        splitIndex = item.lastIndexOf(']');
        time = item.slice(1, splitIndex);
        item = item.slice(splitIndex + 1);
        seconds = time.split(':')[0] * 60 + Math.round(time.split(':')[1]);
        lrcs.push(seconds);
        lrcs.push(item);
      }
    }

    this.setState({
      lrcs
    });
  }

  componentDidMount() {
    this.fetchLrc(this.props.name);
  }

  componentWillReceiveProps(nextProps) {
    // check lrc time
    if (this.state.lrcs.indexOf(nextProps.time) !== -1) {
      this.setState({
        currentIndex: this.state.lrcs.indexOf(nextProps.time) + 1
      });
    }

    // check lrc name
    if (nextProps.name !== this.state.name) {
      this.fetchLrc(nextProps.name);
      this.setState({
        name: nextProps.name
      })
    }
  }

  render() {
    return (
      <div className="lrc">
        <div className="lrc-area" style={{transform: `translateY(-${this.state.currentIndex * 14}px)`}}>
          {
            this.state.lrcs.map((item, i) => {
              if (i % 2 === 1) {
                return (
                  <p key={i}
                    className={i === this.state.currentIndex ? 'lrc-current' : '' }>
                    {item}
                  </p>
                )
              } else {
                return undefined;
              }
            })
          }
        </div>
      </div>
    );
  }
}

export default Lrc;
