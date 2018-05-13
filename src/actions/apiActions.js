import request from '../api/request'

export function getWeatherByLocationQuery (searchString, accuracy = 'like') {
    return request.get('/weather', {
        params: { q: searchString, type: accuracy }
    })
}

export function getWeatherByCoords (lat, lon) {
    return request.get('/weather', {
        params: { lat, lon }
    })
}