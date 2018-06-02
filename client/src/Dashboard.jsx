import React, { Component } from 'react';
import Clock from './modules/clock/Clock.jsx';
import Weather from './modules/weather/Weather.jsx';
import './Dashboard.css';


export default class Dashboard extends Component {
  render() {
    return (
      <div className='dashboard'>
        <Clock />
        <Weather />
      </div>
    )
  }
}
