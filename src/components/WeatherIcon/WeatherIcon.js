import React from 'react'
import PropTypes from 'prop-types'

import {
  STATIC_ICONS_MAP,
  ANIMATED_ICONS_MAP
} from './icons'

import noImageSVG from '../../icons/static/error.svg'

class WeatherIcon extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string,
    type: PropTypes.oneOf(['static', 'animated']),
    width: PropTypes.number,
    height: PropTypes.number
  }

  static defaultProps = {
    type: 'animated',
    width: 64,
    height: 64
  }

  render() {
    const { type, icon, description, className, width, height } = this.props
    let iconSVG = type === 'animated' ? ANIMATED_ICONS_MAP[icon] : STATIC_ICONS_MAP[icon]

    if (!iconSVG) {
      iconSVG = noImageSVG
    }

    return <img className={className} src={iconSVG} title={description} alt={description} width={width} height={height} />
  }
}

export default WeatherIcon