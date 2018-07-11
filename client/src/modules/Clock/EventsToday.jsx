import React from 'react';
import CalendarHelper from './CalendarHelper.js';
import './Clock.css';

const EventsToday = (props) => (
  <div className='events-today'>
    <table>
      <caption>Events Today</caption> 
      <tbody>
        {
          props.events.map(event => {
            const startTime = CalendarHelper.convertDateToTime(new Date(event.start), true)
            const endTime = CalendarHelper.convertDateToTime(new Date(event.end), true)
            return (
              <tr 
                className='event' 
                key={event.title}
              >
                <td>
                  <div className='event-header'>
                    <span className='event-title'>{event.title}</span>
                    <span className='event-time'>{startTime} - {endTime}</span>
                  </div>
                  <br />
                  <div className='event-footer'>
                    <p className='event-location'>{event.location}</p>
                  </div>
                  
                </td>
                
              </tr>
            )
          })
        }
      </tbody>
    </table>
  </div>
)

export default EventsToday;