import { observable, action, computed } from 'mobx'

import {
    getWeatherByLocationQuery,
    getWeatherByCoords
} from '../actions/apiActions'

export default class AppStore {
    @observable.ref currentData
    @observable.ref forecastData

    @observable loading = false
    @observable.ref error = null

    @observable query = ''
    @observable lat = null
    @observable lon = null

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
        let result = null
        
        this.setLoading(true)

        try {
            result = await getWeatherByLocationQuery(this.query)
            this.setCurrentWeather(result.data)
        } catch (err) {
            this.setError(err)
            console.error(err)
        }
        
        this.setLoading(false)

        return result
    }

    async getWeatherByLocationCoords() {
        let result = null
        
        this.setLoading(true)

        try {
            result = await getWeatherByCoords(this.lat, this.lon)
            this.setCurrentWeather(result.data)
        } catch (err) {
            this.setError(err)
            console.error(err)
        }
        
        this.setLoading(false)

        return result
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