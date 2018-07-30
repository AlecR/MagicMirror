import React, { Component } from 'react';
import Module from 'core/Module';
import StravaPopout from './StravaPopout';
import RunMap from './RunMap';
import { Route } from 'react-router-dom';
import StravaHelper from './StravaHelper.jsx';
import FontAwesome from 'react-fontawesome';
import './Strava.css';

const AuthRouter = () => (
  <Route 
    path='/dashboard/strava/authenticate'
    render={() => {
      const query = window.location.search;
      StravaHelper.authorizeUser(query);
      return null;
    }}
  />
)

const UnauthorizedScreen = () => (
  <div className='unauthorized-screen'>
    <h1>Cant access your data - Login required </h1>
    <button
      onClick={(e) => {
        e.stopPropagation();
        const clientId = '27346';
        const scope = 'view_private';
        const redirectURI = 'http://localhost:3000/dashboard/strava/authenticate';
        const responseType='code';
        window.location.href = `https://www.strava.com/oauth/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectURI}&response_type=${responseType}`
      }}
    >Log In</button>
  </div>
)

const RunInfo = props => {
  if(!props.runData) { return null }
  const data = props.runData;
  console.log(data);
  const distance = StravaHelper.metersToMiles(data.distance);
  const time = StravaHelper.secondsToFormattedTimeString(data.moving_time);
  const pace = StravaHelper.averageSpeedToPace(data.average_speed);
  const heartrate = parseInt(data.average_heartrate, 10);
  return (
    <div className='strava-latest-run-info__wrapper'>
      <p className='strava-latest-run-info__title'>Latest Run</p>
      <p className='strava-latest-run-info__distance'>
        <span className='strava-latest-run-info__distance--large'>{distance}</span> miles</p>
      <div className='strava-latest-run-info__time-wrapper'>
        <FontAwesome name='clock-o' className='strava-latest-run-info__time-icon'/> 
        <div className='strava-latest-run-info__time'> {time}</div>
      </div>
      <div className='strava-latest-run-info__heart-rate-wrapper'>
        <FontAwesome name='heartbeat' className='strava-latest-run-info__heart-rate-icon'/> 
        <div className='strava-latest-run-info__heart-rate'> <span className='strava-latest-run-info__heart-rate--large'>{heartrate}</span> bpm</div>
      </div>
      <div className='strava-latest-run-info__pace-wrapper'>
        <FontAwesome name='tachometer' className='strava-latest-run-info__pace-icon'/> 
        <div className='strava-latest-run-info__pace'> <span className='strava-latest-run-info__pace--large'>{pace}</span> / mile</div>
      </div>
    </div>
  )
}

const MileageGrid = props => {

  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'TOTAL'];

  return (
      <div className='mileage-grid__grid'>
        <div className='mileage-grid__title'>Weekly Mileage</div>
        {weekdays.map((day, index) => {
          const classes = (index === props.todayIndex) ? 
            'mileage-grid__week-day mileage-grid__week-day--today' : 'mileage-grid__week-day';
          return (
            <div 
              className={classes}
              key={`mileage-grid-day-${index}}`}
            >{day}</div>
          )
        })}
        {props.mileage.map((mileage, index) => (
          <div 
            className='mileage-grid__mileage' 
            key={`mileage-grid-mileage-${index}`}
          >{mileage || '-'}</div>
        ))}
      </div>
  )
}

export default class Strava extends Component {

  state = {
    authorized: false,
    activities: []
  }

  componentDidMount() {
    StravaHelper.isAuthorized(authorized => {
      if (authorized) {
        this.setState({ authorized });
        StravaHelper.getWeeklyActivities(activities => {
          this.setState({ activities })
        });
      }
    });
  }

  calculateMileage = activities => {
    const mileage = [null, null, null, null, null, null, null];
    activities.forEach(activity => {
      if(activity.type !== 'Run') { return }
      const miles = StravaHelper.metersToMiles(activity.distance);
      const dayIndex = new Date(activity.start_date).getDay();
      if(mileage[dayIndex]) {
        mileage[dayIndex] += miles;
      } else {
        mileage[dayIndex] = miles;
      }
    })

    const mileageSum = mileage.reduce((a, b) => (a || 0) + (b || 0), 0);
    mileage.push(parseFloat(mileageSum));
    return mileage;
  }

  render() {
    
    const todayIndex = new Date().getDay();
    const mileage = this.calculateMileage(this.state.activities);
    var recentRun = null;
    var recentRunPolyline = null;
    if(this.state.activities.length > 0) {
      recentRun = this.state.activities[0];
      recentRunPolyline = recentRun.map.summary_polyline;
    }
    return(
      <Module
        name='Strava'
        popoutHeight={500}
        popoutWidth={500} 
        popoutView={null}
      >
        {this.state.authorized ? (
          <div className="strava__wrapper">
            <MileageGrid 
              mileage={mileage}
              todayIndex={todayIndex}
            />
            <RunMap
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDqf1COGwTw6HV09xo4LnmjL3Y7SP1MpK4&v=3.exp&libraries=geometry,drawing,places`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%`, width: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              polyline={recentRunPolyline}
            />
            <RunInfo 
              runData={recentRun}
            />
          </div>
        ) : (
          <UnauthorizedScreen />
        )}
        <AuthRouter />
      </Module>
    )
  }
}
