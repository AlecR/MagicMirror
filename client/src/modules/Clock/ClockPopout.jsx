import React, { Component } from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import CalendarHelper from './CalendarHelper';
import FontAwesome from 'react-fontawesome';

import "react-big-calendar/lib/css/react-big-calendar.css";
import './Clock.css';


Calendar.setLocalizer(Calendar.momentLocalizer(moment));

export default class ClockPopout extends Component {
  
  state = {
    selectedDate: null,
    selectedEvents: []
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

  handleSelectedDate = selectedDate => {
    const selectedEvents = this.props.events.filter(event => {
      const eventDate = new Date(event.start).setHours(0,0,0,0);
      return eventDate === selectedDate;
    });
    selectedDate = CalendarHelper.unixToDate(selectedDate);
    console.log(selectedEvents);
    this.setState({ selectedDate, selectedEvents })
  };

  render() {
    return (
      <div 
        className='clock-popout'
      >
        <Calendar 
          defaultView="month"
          events={this.props.events}
          date={this.props.date}
          selectable={true}
          drilldownView={null}
          onNavigate={ dateString => {
            const date = new Date(dateString)
            this.setState({date})
          }}
          onSelectSlot = { slotData => {
            const date = slotData.start.setHours(0, 0, 0, 0);
            this.handleSelectedDate(date);
          }}
          onSelectEvent={ event => {
            const date = new Date(event.start).setHours(0, 0, 0, 0);
            this.handleSelectedDate(event.start);
          }}
          components={{
            toolbar: this.CustomToolbar
          }}
        />
        {
          this.state.selectedEvents ? (
            <Sidebar 
              selectedDate={this.state.selectedDate}
              selectedEvents={this.state.selectedEvents}
            />
          ) : null
        }
      </div>
    )
  }
}

const Sidebar = props => (
  <div className='calendar-popout__sidebar'>
    <p className='calendar-popout__sidebar-date'>{props.selectedDate}</p>
    {
      props.selectedDate ? (
        props.selectedEvents.length > 0 ? (
          props.selectedEvents.map( event => (
            <div className='calendar-popout__sidebar-event'>
              <p className='calendar-popout__sidebar-event-title'>
                <FontAwesome name='calendar' className='calendar-popout__sidebar-icon' /> {event.title}
              </p>
              <p className='calendar-popout__sidebar-event-time'>
                <FontAwesome name='clock-o' /> {CalendarHelper.convertDateToTime(new Date(event.start), true)} - {CalendarHelper.convertDateToTime(new Date(event.end), true)} 
              </p>
              <p className='calendar-popout__sidebar-event-location'>
                <FontAwesome name='location-arrow' className='calendar-popout__sidebar-icon' /> {event.location}
              </p>
              <div className='calendar-popout__sidebar-event-divider-wrapper'>
                <div className='calendar-popout__sidebar-event-divider'></div>
              </div>
            </div>
          ))
        ) : (
          <p className='calendar-popout__sidebar-no-events'>No Events</p>
        )
      ) : null
      
    }
  </div>
)
  