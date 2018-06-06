import React, { Component } from 'react';
import Calendar, { View } from 'react-big-calendar';
import CalendarHelper from './CalendarHelper';

import "react-big-calendar/lib/css/react-big-calendar.css";
import './Clock.css';
import moment from 'moment';

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

export default class ClockPopout extends Component {  

  state = {
    events: []
  };

  constructor(props) {
    super(props);
    var calendarEvents = [] 
    
  }

  componentWillMount() {
    const updateCalendarData = calendarData => {
      const events = calendarData.map(event => {
        return {
          title: event.name,
          start: event.start,
          end: event.end,
        }
      });
      this.setState({ events })
    }

    CalendarHelper.getCalendarData(updateCalendarData);
    setInterval(() => {
      CalendarHelper.getCalendarData(updateCalendarData);
    }, 300000);
  }

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
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          components={{
            toolbar: this.CustomToolbar
          }}
        />
      </div>
    )
  }
}
  