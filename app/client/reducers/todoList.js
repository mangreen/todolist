import { ADD_TODO, DELETE_TODO, UPDATE_TODO, CLEAR_TODOLIST } from '../constants/ActionTypes'

const initialState = []

export default function todoList(state = initialState, action) {
  	switch (action.type) {
	    case ADD_TODO:
	      	return [createItem(action.text), ...state]

	    case DELETE_TODO:
			return state.filter(item => item.id !== action.id)

	    case UPDATE_TODO:
			return updateItem(action.data, state)

	    case CLEAR_TODOLIST:
			return state.filter(item => item.done === false)

	    default:
	      	return state
  	}
}

let createItem = text => {
	let date = new Date()
	let time = date.getTime()
	return {
		id: time,
		done: false,
		text
	}
}

let updateItem = ({ id, ...other }, state) => {
	return state.map(item => {
			return item.id === id ? Object.assign({}, item, other) : item;
		}
	)
}


