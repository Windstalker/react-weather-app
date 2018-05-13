import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        return (
            <Panel className={classnames('errorPanel', this.props.className)}>
                <img src={errorSVG} alt='error' width={32} height={32} />
                <p>{this.props.error.toString()}</p>
            </Panel>
        );
    }
}

export default ErrorPanel;