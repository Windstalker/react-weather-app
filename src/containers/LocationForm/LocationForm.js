import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react'

import Panel from '../../components/Panel/Panel'
import LocationButton from '../../components/LocationButton/LocationButton'
import LocationInput from '../../components/LocationInput/LocationInput'

import './LocationForm.css'

@inject('store')
@observer
class LocationForm extends Component {
    static propTypes = {
        store: PropTypes.shape({
            getWeatherByLocationCoords: PropTypes.func.isRequired,
            getWeatherByLocationName: PropTypes.func.isRequired,
            setQuery: PropTypes.func.isRequired,
            setCoords: PropTypes.func.isRequired,
            setError: PropTypes.func.isRequired,
        }).isRequired
    }

    handleLocationSuccess = (result) => {
        const { coords } = result
        const { store } = this.props
        
        store.setCoords(coords.latitude, coords.longitude)
        store.getWeatherByLocationCoords()
    }

    handleLocationError = (error) => {
        let message = ''
        
        switch (error.code) {
            case error.PERMISSION_DENIED:
                message = 'User denied the request for Geolocation.'
                break;
            case error.POSITION_UNAVAILABLE:
                message = 'Location information is unavailable.'
                break;
            case error.TIMEOUT:
                message = 'The request to get user location timed out.'
                break;
            case error.UNKNOWN_ERROR:
                message = 'An unknown error occurred.'
                break;
            default:
                message = 'An unknown error occurred.'
                break;
        }

        this.props.store.setError(new Error(message))
    }

    handleInputChange = (e) => {
        this.props.store.setQuery(e.target.value)
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.props.store.getWeatherByLocationName()
    }

    render() {
        const { store } = this.props

        return (
            <Panel className='LocationForm'>
                <form onSubmit={this.handleFormSubmit}>
                    <LocationInput disabled={store.loading} onChange={this.handleInputChange} value={store.query} />
                    <LocationButton onSuccess={this.handleLocationSuccess} onError={this.handleLocationError} />
                </form>
            </Panel>
        );
    }
}

export default LocationForm;