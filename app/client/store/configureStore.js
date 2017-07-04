import { createStore, compose, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

import { createLogger } from 'redux-logger'
import callTraceMiddleware from '../middlewares/callTraceMiddleware'

const logger = createLogger({
    level: 'info',
    collapsed: true,
    // predicate: (getState, action) => action.type !== AUTH_REMOVE_TOKEN
});

export default function configureStore(history, initialState) {

    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(
                routerMiddleware(history),
                thunk
            )
        )
    )

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers')
            store.replaceReducer(nextReducer)
        })
    }

  return store
}
