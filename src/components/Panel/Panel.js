import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './Panel.css'

class Panel extends Component {
    static propTypes = {
      className: PropTypes.string,
      children: PropTypes.node
    }

    render() {
      return (
        <div className={classnames('panel', this.props.className)}>
          {this.props.children}
        </div>
      )
    }
}

export default Panel