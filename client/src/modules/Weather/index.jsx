import React from 'react';
import WeatherHelper from './WeatherHelper.js';
import WeatherIcons from 'react-weathericons';
import LoadingSpinner from 'core/shared/LoadingSpinner';
import Module from 'core/Module';
import WeatherPopout from './WeatherPopout';
import 'weathericons/css/weather-icons.css';
import './Weather.css';

const Forecast = (props) => (
  <div>
    <section className='weather-header'>
      <WeatherIcons
        className={`weather-current-icon wi-forecast-io-${props.weatherCode}`}
        name=''
        size="4x"/>
      <p className='weather-current-temp'>{props.currentTemp}°</p>
    </section>
    <p className='weather-location'>{props.location}</p>
    <section className='weather-forecast'>
      <table className='forecast-table' cellSpacing={0}>
        <tbody>
          {props.forecasts.map((forecast, index) => (
              <tr className='forecast-row' key={`row-${index}`}>
                <td className='forecast-day'>{forecast.day}</td>
                <td className='forecast-icon'>
                  <WeatherIcons
                    className={`weather-current-icon wi-forecast-io-${forecast.weatherCode}`}
                    name=''
                    size="2x"/>
                </td>
                <td className='forecast-high'>{forecast.tempHigh}</td>
                <td className='forecast-low'>{forecast.tempLow}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </section>
    
  </div>
)

class Weather extends React.Component {

  state = {
    location: null,
    temp: null,
    weatherCode: null,
    forecasts: []
  }

  render() {
    return (
      <Module 
        className='weather'
        name='weather'
        popoutHeight={600}
        popoutWidth={400}
        popoutView={<WeatherPopout 
          hourlyWeather={this.state.hourlyWeather }
        />}
      >
        {
          this.state.forecasts.length < 1 ? (
            <LoadingSpinner 
              loadingText='Loading Weather...'
            />
          ) : (
           <Forecast 
            location={this.state.location}
            currentTemp={this.state.currentTemp}
            weatherCode={this.state.weatherCode}
            forecasts={this.state.forecasts}
           />
          ) 
        }
        
      </Module>
    )
  }

  componentWillMount() {

    const updateWeatherData = weatherData => {
      if(!weatherData) { 
        console.log('WARNING: Unable to get weather data');
        return
      }
      var forecasts = weatherData.daily.data.slice(1, 6);
      const currentTemp = parseInt(weatherData.currently.temperature, 10);
      const weatherCode = weatherData.currently.icon
      forecasts = forecasts.map(forecast => {
        const date = new Date(forecast.time * 1000)
        const day = WeatherHelper.days[date.getDay()]
        const tempLow = parseInt(forecast.temperatureLow, 10);
        const tempHigh = parseInt(forecast.temperatureHigh, 10);
        const weatherCode = forecast.icon;
        return {day, tempLow, tempHigh, weatherCode}
      })
      this.setState({currentTemp, weatherCode, forecasts});
    }

    const updateHourlyData = weatherData => {
      if(!weatherData) { 
        console.log('WARNING: Unable to get hourly weather data');
        return
      }
      const fullDayData = weatherData.hourly.data.slice(1,25);
      const filteredData = fullDayData.filter((data, index) => {
        return index % 3 === 0;
      })
      const hourlyWeather = filteredData.map(weatherEntry => {
        const date = new Date(weatherEntry.time * 1000)
        const hours = date.getHours()
        const time = WeatherHelper.hourToTime(hours);
        const weatherCode = weatherEntry.icon;
        const temp = parseInt(weatherEntry.temperature, 10);
        const precipChance = parseInt(weatherEntry.precipProbability, 10);
        return { time, weatherCode, temp , precipChance };
      })
      this.setState({ hourlyWeather });
    }

    WeatherHelper.getLocation(location => {
      this.setState({ location });
    })

    WeatherHelper.getWeatherData(updateHourlyData)
    setInterval(() => {
      WeatherHelper.getWeatherData(updateHourlyData)
    }, 300000)

    WeatherHelper.getWeatherData(updateWeatherData)
    setInterval(() => {
      WeatherHelper.getWeatherData(updateWeatherData)
    }, 300000)
  }
}

export default Weather;