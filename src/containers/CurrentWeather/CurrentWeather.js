import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames'

import WeatherIcon from '../../components/WeatherIcon/WeatherIcon'
import Wind from '../../components/Wind/Wind'
import Temperature from '../../components/Temperature/Temperature'
import Humidity from '../../components/Humidity/Humidity'
import Pressure from '../../components/Pressure/Pressure'
import Panel from '../../components/Panel/Panel'

import './CurrentWeather.css'

class CurrentWeather extends Component {
    static propTypes = {
        data: PropTypes.shape({
            name: PropTypes.string,
            main: PropTypes.shape({
                temp: PropTypes.number,
                humidity: PropTypes.number,
                pressure: PropTypes.number
            }).isRequired,
            wind: PropTypes.shape({
                deg: PropTypes.number,
                speed: PropTypes.number
            }).isRequired,
            weather: PropTypes.arrayOf(PropTypes.shape({
                main: PropTypes.string, 
                description: PropTypes.string, 
                icon: PropTypes.string
            })).isRequired,
        }).isRequired,
        className: PropTypes.string
    }

    static defaultProps = {
        data: {
            name: '',
            main: {},
            wind: {},
            weather: []
        },
        className: ''
    }

    render() {
        const { data, className } = this.props
        const { wind, main, weather } = data
        let weatherData = weather && weather[0]

        return (
            <Panel className={classnames('CurrentWeather', className)}>
                <strong className="cityName">{data.name}</strong>
                { weatherData && <WeatherIcon {...weatherData} width={128} height={128} /> }
                <Temperature value={main.temp} />
                <div className="additionalData">
                    <p>Humidity: <Humidity value={main.humidity} /></p>
                    <p>Pressure: <Pressure value={main.pressure} /></p>
                    <Wind {...wind} />
                </div>
            </Panel>
        );
    }
}

export default CurrentWeather;