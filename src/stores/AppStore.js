import { observable, action, computed } from 'mobx'
import uuid from 'uuid-js'

import {
  getWeatherByLocationQuery,
  getWeatherByCoords,
  getForecastByLocationQuery,
  getForecastByCoords
} from '../actions/apiActions'

function proccessWeatherData(data) {
  const { description, icon, main: label } = (data.weather && data.weather[0]) || {}
  const {
    humidity,
    pressure,
    temp,
    temp_max,
    temp_min
  } = data.main || {}
  const wind = data.wind || {}

  return {
    id: uuid.create().toString(),
    dt: data.dt,
    label,
    description,
    icon,
    humidity,
    pressure,
    temp,
    temp_max,
    temp_min,
    wind
  }
}

function processForecastData(data) {
  const list = data.list

  return list.map(proccessWeatherData)
}

export default class AppStore {
    @observable.ref currentData
    @observable.ref forecastData

    @observable loading = false
    @observable.ref error = null

    @observable queryType = 'like'
    @observable query = ''
    @observable lat = null
    @observable lon = null
    @observable forecastDaysCount = 5

    @action setLoading(loading) {
      this.loading = loading
    }

    @action setError(error) {
      this.error = error
    }

    @action setCoords(lat, lon) {
      this.lat = lat
      this.lon = lon
    }

    @action setQuery (query) {
      this.query = query
    }

    @action setCurrentWeather(response) {
      this.currentData = response
      this.setCoords(response.coord.lat, response.coord.lon)
      this.setQuery(this.displayedLocation)
    }

    @action setForecastWeather(response) {
      this.forecastData = response
    }

    @action clearData() {
      this.currentData = undefined
      this.forecastData = undefined
    }

    async getWeatherByLocationName() {
      this.setError(null)
      this.setLoading(true)

      try {
        const result = await getWeatherByLocationQuery(this.query, this.queryType)
        const forecastResult = await getForecastByLocationQuery(this.query, this.queryType)

        this.setCurrentWeather(result.data)
        this.setForecastWeather(forecastResult.data)
      } catch (err) {
        this.setError(err)
        console.error(err)
      }

      this.setLoading(false)
    }

    async getWeatherByLocationCoords() {
      this.setError(null)
      this.setLoading(true)

      try {
        const result = await getWeatherByCoords(this.lat, this.lon)
        const forecastResult = await getForecastByCoords(this.lat, this.lon)

        this.setCurrentWeather(result.data)
        this.setForecastWeather(forecastResult.data)
      } catch (err) {
        this.setError(err)
        console.error(err)
      }

      this.setLoading(false)
    }

    @computed get displayedLocation() {
      const data = this.currentData

      if (data) {
        return `${data.name},${data.sys.country}`
      }

      return ''
    }

    @computed get currentWeather() {
      const data = this.currentData

      if (!data) return {}

      return proccessWeatherData(data)
    }

    @computed get forecastList() {
      const data = this.forecastData

      if (!data) return []

      return processForecastData(data)
    }

    @computed get isCurrentWeatherEmpty() {
      return !this.currentData
    }

    @computed get isForecastWeatherEmpty() {
      return !this.forecastData
    }

    @computed get isCurrentWeatherReady() {
      return !this.loading && !!this.currentData
    }

    @computed get isForecastWeatherReady() {
      return !this.loading && !!this.forecastData
    }
}