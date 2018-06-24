import React from 'react';
import './Clock.css';
import Module from '../Module/Module.jsx';
import ClockPopout from './ClockPopout';
import CalendarHelper from './CalendarHelper.js';
import EventsToday from './EventsToday';

class Clock extends React.Component {

  // TODO: Make options configurable
  dateOptions = { weekday: 'long', month: 'long', day: 'numeric'};
  timeHourMinutesOptions = { hour: 'numeric', minute: '2-digit' }
  timeSecondsOptions = {second: '2-digit'}
  locale = 'en-US';

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      eventsToday: [],
      date: new Date(),
      formattedDate: new Date().toLocaleDateString('en-US', this.dateOptions),
      timeHourMinutes: new Date().toLocaleTimeString(this.locale, this.timeHourMinutesOptions).split(' ')[0],
      timeSeconds: new Date().toLocaleTimeString(this.locale, this.timeSecondsOptions)
    }
  }

  componentDidMount() {
    this.clockInterval = setInterval(
      () => this.tick(),
      500
    );
    const currentDate = new Date();
    const updateCalendarData = calendarData => {
      const events = calendarData.map(event => {
        const eventDate = new Date(event.start)
        return {
          title: event.name,
          start: event.start,
          end: event.end,
          today: CalendarHelper.isSameDay(currentDate, eventDate),
          location: event.location,
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

  tick() {
    const dateInfo = new Date()
    const formattedDate = dateInfo.toLocaleDateString(this.locale, this.dateOptions);
    const timeHourMinutes = CalendarHelper.convertDateToTime(dateInfo)
    var timeSeconds = dateInfo.toLocaleTimeString(this.locale, this.timeSecondsOptions);
    timeSeconds = this.padSeconds(timeSeconds);
    this.setState({formattedDate, timeHourMinutes, timeSeconds});
  }

  

  padSeconds(seconds) {
    if (seconds < 10) {
      return `0${seconds}`;
    } else {
      return seconds;
    }
  }

  updateCalendarDate = (date) => {
    this.setState({date})
  }

  render() {
    const eventsToday = this.state.events.filter(event => {
      return event.today;
    }).sort((eventOne, eventTwo) => {
      return eventOne.start > eventTwo.start;
    })
    console.log(eventsToday);
    return (
      <Module 
        name='clock'
        popoutHeight={1000}
        popoutWidth={1000}
        popoutView={<ClockPopout 
          events={this.state.events}
          date={this.state.date}
          onDateChange={this.updateCalendarDate}
        />}
      >
        <div className='clock'>
          <div className='clock-header'>
            <div className='clock-time'>
              <span className='clock-hour-minutes'>{this.state.timeHourMinutes}</span><span className='clock-seconds'>{this.state.timeSeconds}</span>
            </div>
            <p className='clock-date'>{this.state.formattedDate}</p>
          </div>
          {
            eventsToday.length > 0 ? (
              <EventsToday 
                events={eventsToday}
              />
            ) : (
              <div className='no-events'>
                No Events Today
              </div>
            )
          }
          
        </div>
      </Module>
    )
  }
}

export default Clock;