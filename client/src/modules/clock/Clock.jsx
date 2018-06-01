import React from 'react';
import './Clock.css';
import Module from '../module/Module.jsx';
import ClockPopout from './ClockPopOut';

class Clock extends React.Component {

  dateOptions = { weekday: 'long', month: 'long', day: 'numeric'};
  timeHourMinutesOptions = { hour: 'numeric', minute: '2-digit' }
  timeSecondsOptions = {second: '2-digit'}
  locale = 'en-US';


  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toLocaleDateString('en-US', this.dateOptions),
      timeHourMinutes: new Date().toLocaleTimeString(this.locale, this.timeHourMinutesOptions).split(' ')[0],
      timeSeconds: new Date().toLocaleTimeString(this.locale, this.timeSecondsOptions)
    }
  }

  componentDidMount() {
    this.clockInterval = setInterval(
      () => this.tick(),
      500
    );
  }

  tick() {
    const dateInfo = new Date()
    const date = dateInfo.toLocaleDateString(this.locale, this.dateOptions);
    const timeHourMinutes = dateInfo.toLocaleTimeString(this.locale, this.timeHourMinutesOptions).split(' ')[0];
    var timeSeconds = dateInfo.toLocaleTimeString(this.locale, this.timeSecondsOptions);
    timeSeconds = this.padSeconds(timeSeconds)
    this.setState({date, timeHourMinutes, timeSeconds});
  }

  padSeconds(seconds) {
    if (seconds < 10) {
      return `0${seconds}`;
    } else {
      return seconds
    }
  }

  render() {
    return (
      <Module 
        className='clock'
        name='clock'
        popOutView={<ClockPopout />}
        popoutHeight={300}
        popoutWidth={300}
      >
        <div className='clock-time'>
          <span className='clock-hour-minutes'>{this.state.timeHourMinutes}</span><span className='clock-seconds'>{this.state.timeSeconds}</span>
        </div>
        <p className='clock-date'>{this.state.date}</p>
      </Module>
    )
  }
}

export default Clock;