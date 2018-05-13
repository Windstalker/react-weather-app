import React from 'react';
import PropTypes from 'prop-types';

import NumericValue from '../NumericValue/NumericValue'

export default function Temperature(props) {
    return <NumericValue {...props} displayUnits={'\u2103'} />
};