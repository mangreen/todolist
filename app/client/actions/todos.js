import 'isomorphic-fetch'
import * as types from '../constants/ActionTypes'

export function addTodo(text, callback) {
  	return dispatch => {
  			dispatch({
	        	type: types.ADD_TODO,
	        	text
	        });

  			if (callback) {
	    		callback();
	       	}
  		}		
}

export function deleteTodo(id, callback) {
  	return dispatch => {
  			dispatch({
	        	type: types.DELETE_TODO,
	        	id
	        });

  			if (callback) {
	    		callback();
	       	}
  		}		
}


export function updateTodo(data, callback) {
  	return dispatch => {
  			dispatch({
	        	type: types.UPDATE_TODO,
	        	data
	        });

  			if (callback) {
	    		callback();
	       	}
  		}		
}

export function clearTodoList(callback) {
  	return dispatch => {
  			dispatch({
	        	type: types.CLEAR_TODOLIST
	        });

  			if (callback) {
	    		callback();
	       	}
  		}		
}
