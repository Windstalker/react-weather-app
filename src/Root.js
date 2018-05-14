import React from 'react'
import { Provider } from 'mobx-react'
import App from './App'

import AppStore from './stores/AppStore'

const stores = {
  store: new AppStore()
}

export default function Root() {
  return <Provider {...stores}>
    <App />
  </Provider>
}