import React, { Component } from 'react';
import classnames from 'classnames'

import CurrentWeather from './containers/CurrentWeather/CurrentWeather'

import './App.css';

import request from './api/request'

class App extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      weatherData: undefined
    }
  }

  componentDidMount() {
    this.fetchWeather()
  }

  async fetchWeather() {
    let result
    try {
      result = await request.get('/weather', {
        params: {
          q: 'Kharkiv',
        }
      })
      console.log(result)
      this.setState((state) => {
        return {...state, weatherData: result.data}
      })
    } catch (e) {
      console.error(e)
    }
  }

  getWeatherBackground(weather) {
    const iconCode= weather.icon || ''
    const isNight = iconCode.slice(-1) === 'n'

    if (isNight) return 'bg-night'

    switch (iconCode.slice(0, -1)) {
      case '01':
        return 'bg-clear'
      case '02':
      case '03':
        return 'bg-clouds'
      case '04':
      case '10':
      case '11':
        return 'bg-rain'
      case '13':
        return 'bg-snow'
      case '50':
        return 'bg-mist'
      default:
        return ''
    }
  }

  render() {
    const { weatherData } = this.state
    const weather = (weatherData && weatherData.weather && weatherData.weather[0]) || {}

    return (
      <div className={classnames("App", this.getWeatherBackground(weather))}>
        <CurrentWeather data={weatherData} />
      </div>
    );
  }
}

export default App;
