import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { observer, inject } from 'mobx-react'

import WeatherIcon from '../../components/WeatherIcon/WeatherIcon'
import Wind from '../../components/Wind/Wind'
import Temperature from '../../components/Temperature/Temperature'
import Humidity from '../../components/Humidity/Humidity'
import Pressure from '../../components/Pressure/Pressure'
import Panel from '../../components/Panel/Panel'

import './CurrentWeather.css'

@inject('store')
@observer
class CurrentWeather extends Component {
    static propTypes = {
      store: PropTypes.shape({
        displayedLocation: PropTypes.string,
        currentWeather: PropTypes.shape({
          label: PropTypes.string,
          description: PropTypes.string,
          icon: PropTypes.string,
          temp: PropTypes.number,
          humidity: PropTypes.number,
          pressure: PropTypes.number,
          wind: PropTypes.shape({
            deg: PropTypes.number,
            speed: PropTypes.number
          }).isRequired,
        }).isRequired,
      }).isRequired,
      className: PropTypes.string
    }

    static defaultProps = {
      className: ''
    }

    render() {
      const { store, className } = this.props
      const { wind, humidity, pressure, temp, icon, description } = store.currentWeather

      return (
        <Panel className={classnames('CurrentWeather', className)}>
          <strong className='cityName'>{store.displayedLocation}</strong>
          <WeatherIcon icon={icon} description={description} width={128} height={128} />
          <Temperature value={temp} />
          <div className='additionalData'>
            <p>Humidity: <Humidity value={humidity} /></p>
            <p>Pressure: <Pressure value={pressure} /></p>
            <Wind {...wind} />
          </div>
        </Panel>
      )
    }
}

export default CurrentWeather