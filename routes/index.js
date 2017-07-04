import fs from 'fs'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createMemoryHistory, RouterContext, match } from 'react-router';

import configureStore from '../app/client/store/configureStore'
import routes from '../app/client/config/routes'

exports.handleRouting = function(req, res, next) {
	
	const memoryHistory = createMemoryHistory(req.url)
  	const store = configureStore(memoryHistory, req.initialState)
  	const history = syncHistoryWithStore(memoryHistory, store)

  	match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
	    if (error) {
	      res.status(500).send(error.message);
	    } else if (redirectLocation) {
	      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
	    } else if (renderProps) {

		    const index = fs.readFileSync('./views/index.html', {encoding: 'utf-8'} );

		    var markup = renderToString(
						<Provider store={store}>
							<RouterContext {...renderProps} />
		      			</Provider>
					);
		    
			let state = JSON.stringify( store.getState() );

			var str = index.replace( '${markup}', markup )
						.replace( '${state}', state );

		    return res.send( str );

	    } else {
	      	return res.status(404).send('Not Found');
	    }
    
  	});
    
};
