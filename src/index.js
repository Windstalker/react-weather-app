import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx'

import './index.css';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';

configure({ enforceActions: true });

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
