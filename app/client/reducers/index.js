import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';

import todoList from './todoList'

const rootReducer = combineReducers({
	routing: routerReducer,
	todoList
})

export default rootReducer
