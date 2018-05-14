import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './LocationInput.css'

class LocationInput extends Component {
  static propTypes = {
    className: PropTypes.string,
  }

  render() {
    const { className, ...props } = this.props

    return <input className={classnames('locationInput', className)} placeholder='Enter location name' {...props} />
  }
}

export default LocationInput