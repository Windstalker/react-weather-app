import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import classnames from 'classnames'

import Panel from '../../components/Panel/Panel'
import ForecastEntry from '../../components/ForecastEntry/ForecastEntry'

@inject('store')
@observer
class Forecast extends Component {
  static propTypes = {
    store: PropTypes.shape({
      forecastList: PropTypes.array
    }),
    className: PropTypes.string
  }

  render() {
    const { store, className } = this.props

    return <Panel className={classnames('Forecast', className)}>
      {store.forecastList.map(entry => {
        return <ForecastEntry key={entry.id} {...entry} />
      })}
    </Panel>
  }
}

export default Forecast