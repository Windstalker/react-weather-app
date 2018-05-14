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

export function getForecastByLocationQuery (searchString, accuracy = 'like') {
  return request.get('/forecast', {
    params: {
      q: searchString,
      type: accuracy
    }
  })
}

export function getForecastByCoords (lat, lon) {
  return request.get('/forecast', {
    params: { lat, lon }
  })
}