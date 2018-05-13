import React from 'react';

import NumericValue from '../NumericValue/NumericValue'

export default function Temperature(props) {
    return <NumericValue {...props} displayUnits={'\u2103'} />
};