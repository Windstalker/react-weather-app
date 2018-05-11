import axios from 'axios'
import { API_KEY } from '../constants/config'

const request = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/',
    params: {
        APPID: API_KEY
    }
})

export default request
