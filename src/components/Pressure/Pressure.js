import React from 'react';

import NumericValue from '../NumericValue/NumericValue'

export default function Pressure(props) {
    return <NumericValue {...props} displayUnits='hPa' />
};