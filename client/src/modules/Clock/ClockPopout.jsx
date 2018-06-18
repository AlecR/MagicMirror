import React, { Component } from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';

import "react-big-calendar/lib/css/react-big-calendar.css";
import './Clock.css';


Calendar.setLocalizer(Calendar.momentLocalizer(moment));

export default class ClockPopout extends Component {  

  componentWillUnmount() {
    clearInterval();
  }

  CustomToolbar = (toolbar) => {
    const prevMonth = () => {
      toolbar.date.setMonth(toolbar.date.getMonth() - 1);
      toolbar.onNavigate('prev');
    };

    const nextMonth = () => {
      toolbar.date.setMonth(toolbar.date.getMonth() + 1);
      toolbar.onNavigate('next');
    };

    const label = () => {
      const date = moment(toolbar.date);
      return (
        <span>{date.format('MMMM')}<span> {date.format('YYYY')}</span></span>
      );
    };

    return (
        <div className='custom-toolbar'>
          <button className='prev-month-button' onClick={prevMonth}>&#8249;</button>
          <label className='date-label'>{label()}</label>
          <button className='next-month-button' onClick={nextMonth}>&#8250;</button>
        </div>
    );  
  }

  render() {
    return (
      <div 
        className='clock-pop-out'
      >
        <Calendar 
          defaultView="month"
          events={this.props.events}
          date={this.props.date}
          onNavigate={ dateString => {
            const date = new Date(dateString)
            this.setState({date})
          }}
          components={{
            toolbar: this.CustomToolbar
          }}
        />
      </div>
    )
  }
}
  