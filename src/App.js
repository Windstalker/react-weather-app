import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { observer, inject } from 'mobx-react'

import Panel from './components/Panel/Panel'
import ErrorPanel from './components/ErrorPanel/ErrorPanel'
import LocationForm from './containers/LocationForm/LocationForm'
import CurrentWeather from './containers/CurrentWeather/CurrentWeather'

import './App.css';

@inject('store')
@observer
class App extends Component {
  static propTypes = {
    store: PropTypes.shape({
      error: PropTypes.object,
      currentWeather: PropTypes.shape({
        icon: PropTypes.string
      }),
      isCurrentWeatherEmpty: PropTypes.bool,
      loading: PropTypes.bool
    }).isRequired,
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

  renderWeatherContainers() {
    return [
      <CurrentWeather key='current-weather'/>
    ]
  }

  renderLoading() {
    return <Panel><strong>Loading...</strong></Panel>
  }

  renderError() {
    return <ErrorPanel error={this.props.store.error} />
  }

  render() {
    const { store } = this.props
    
    const className = classnames(
      "App", 
      !store.isCurrentWeatherEmpty && this.getWeatherBackground(store.currentWeather)
    )

    return (
      <div className={className}>
        <LocationForm />
        {store.error && this.renderError()}
        {store.loading && this.renderLoading()}
        {store.isCurrentWeatherReady && this.renderWeatherContainers()}
      </div>
    );
  }
}

export default App;
