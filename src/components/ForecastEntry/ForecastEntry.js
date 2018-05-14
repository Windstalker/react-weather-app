import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import formatDate from 'date-fns/format'

import WeatherIcon from '../WeatherIcon/WeatherIcon'
import Humidity from '../Humidity/Humidity'
import Temperature from '../Temperature/Temperature'
import Pressure from '../Pressure/Pressure'
import Wind from '../Wind/Wind'

import './ForecastEntry.css'

class ForecastEntry extends Component {
  static propTypes = {
    dt: PropTypes.number,
    label: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string,
    humidity: PropTypes.number,
    pressure: PropTypes.number,
    temp: PropTypes.number,
    temp_max: PropTypes.number,
    temp_min: PropTypes.number,
    wind: PropTypes.shape({
      speed: PropTypes.number,
      deg: PropTypes.number
    }),
    className: PropTypes.string
  }

  render() {
    const {
      dt,
      description,
      icon,
      humidity,
      pressure,
      temp,
      wind,
      className
    } = this.props
    let timestamp = dt * 1000

    return (
      <div className={classnames('forecastEntry', className)}>
        <strong className='forecast-date'>{formatDate(timestamp, 'MMM DD, HH:mm')}</strong>
        <WeatherIcon className='forecast-icon' type='static' icon={icon} description={description} />
        <Temperature className='forecast-temp' value={temp} />
        <Wind className='forecast-wind inline' size='small' {...wind} />
        <Humidity className='forecast-humidity' value={humidity} />
        <Pressure className='forecast-pressure' value={pressure} />
      </div>
    )
  }
}

export default ForecastEntry