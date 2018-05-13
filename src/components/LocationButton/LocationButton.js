import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import { getLocation } from '../../utils/geolocation'

import './LocationButton.css'

@observer
class LocationButton extends Component {
    static propTypes = {
        onSuccess: PropTypes.func,
        onError: PropTypes.func
    }

    static defaultProps = {
        onSuccess() {},
        onError() {}
    }

    @observable isLoading = false

    @action setLoading(loading) {
        this.isLoading = loading
    }

    async getUserLocation () {
        const { onSuccess, onError } = this.props

        this.setLoading(true)
     
        try {
            const result = await getLocation()
            onSuccess(result)
        } catch (err) {
            onError(err)
        } finally {
            this.setLoading(false)
        }
    }

    handleClick = () => {
        this.getUserLocation()
    }

    render() {
        const { className } = this.props

        return (
            <button 
                disabled={this.isLoading} 
                className={classnames('locationButton', className)} 
                type='button' 
                title='Get location' 
                onClick={this.handleClick}
            />
        );
    }
}

export default LocationButton;