import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './Wind.css'

export default class Wind extends React.PureComponent {
    static propTypes = {
        deg: PropTypes.number,
        speed: PropTypes.number,
        size: PropTypes.string
    }

    static defaultProps = {
        speed: 0,
        deg: 0,
        size: 'medium'
    }

    render() {
        const { speed, deg, size } = this.props
        const style = {
            transform: `rotate(${deg}deg)`
        }

        return <div className='wind-container'>
            <span className='wind-speed'>{speed} m/s</span>
            <div className={classnames('wind-direction', size)}>
                <span className='wind-arrow' style={style} />
            </div>
        </div>
    }
}