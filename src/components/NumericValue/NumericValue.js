import React from 'react';
import PropTypes from 'prop-types';

class NumericValue extends React.PureComponent {
    static propTypes = {
        value: PropTypes.number,
        displayUnits: PropTypes.string
    }

    static defaultProps = {
        displayUnits: ''
    }

    render() {
        const { value, displayUnits, className, ...props } = this.props
        const percents = typeof value === 'number' ? `${value}${displayUnits}` : ''

        return <span className={className} title={percents} {...props}>{percents}</span>
    }
}

export default NumericValue;