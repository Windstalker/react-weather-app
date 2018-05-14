import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Panel from '../Panel/Panel'
import errorSVG from '../../icons/static/error.svg'

import './ErrorPanel.css'

class ErrorPanel extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    className: PropTypes.string
  }

  render() {
    const { error } = this.props
    const response = error.response ? error.response.data : null

    return (
      <Panel className={classnames('errorPanel', this.props.className)}>
        <img src={errorSVG} alt='error' width={32} height={32} />
        &nbsp;
        <p>
          <strong>{this.props.error.toString()}</strong>
          {response && <span>: {response.message}</span>}
        </p>
      </Panel>
    )
  }
}

export default ErrorPanel