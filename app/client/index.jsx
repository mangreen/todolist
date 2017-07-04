import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import routes from './config/routes';
import configureStore from './store/configureStore'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import 'react-tabs/style/react-tabs.css';
import 'react-image-crop/dist/ReactCrop.css';

const initialState = window.__INITIAL_STATE__
const store = configureStore(browserHistory, initialState)

const history = syncHistoryWithStore(browserHistory, store);

render(
  	<Provider store={store}>
  		<Router history={history}>
    		{routes}
    	</Router>
  	</Provider>,
  	document.getElementById('root')
)
