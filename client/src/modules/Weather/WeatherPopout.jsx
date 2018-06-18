import React, { Component } from 'react';
import WeatherIcons from 'react-weathericons';

export default class WeatherPopout extends Component {

  render() {
    return (
      <div className='weather-popout'>
        <div className='weather-popout-header'>
          <p>Hourly Forecast</p>
        </div>
        <div className='weather-popout-forecast'>
          <table>
            <tbody>
              {
                this.props.hourlyWeather.map(weather => (
                  <tr
                    key={weather.time}
                  >
                    <td>{weather.time}</td>
                    <td>{weather.temp}°</td>
                    <td>
                      <WeatherIcons
                        className={`wi-forecast-io-${weather.weatherCode} popout-forecast-icon`}
                        name=''
                        size="2x"
                      />
                    </td>
                    <td>
                      <div className='precip-chance'>
                        {weather.precipChance}%
                        <WeatherIcons
                          className='wi-raindrop precip-chance-icon'
                          name=''
                        /> 
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}