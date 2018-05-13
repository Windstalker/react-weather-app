import React from 'react';

import NumericValue from '../NumericValue/NumericValue'

export default function Humidity(props) {
    return <NumericValue {...props} displayUnits='%' />
};;