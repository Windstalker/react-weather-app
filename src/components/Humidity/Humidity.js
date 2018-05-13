import React from 'react';
import PropTypes from 'prop-types';

import NumericValue from '../NumericValue/NumericValue'

export default function Humidity(props) {
    return <NumericValue {...props} displayUnits='%' />
};;