import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router';

import TodoItem from '../components/TodoItem';

class Q1Page extends Component {
	constructor(props, context) {
        super(props, context);

        this.state = {
            newTodoInput: "",
            filter: "all"
        }
    }

    _handleInputChange(event) {
    	this.setState({
    		newTodoInput: event.target.value
    	});
    }

    _handleTodoAdd(event) {
    	this.props.actions.todoActions.addTodo(this.state.newTodoInput, ()=>{
    		this.setState({
                newTodoInput: ""
            });
        });
    }

    _handleTodoListClear(event) {
    	this.props.actions.todoActions.clearTodoList();
    }

    _handleTodoFilter(event, filter) {
    	this.setState({
            filter: filter
        });
    }

  	render() {
	    return (
	      	<section className="content">
				<h1>Q1：</h1>

				<div className="container">
					<div className="row">
  						<div className="col-md-offset-2 col-md-8">

  							<div className="row">
  								<div className="col-md-12">
									<div className="input-group">
									  	<input type="text" className="form-control" placeholder="New Todo" value={this.state.newTodoInput} onChange={(event)=>this._handleInputChange(event)}/>
						                  	<span className="input-group-btn">
						                    <button className="btn btn-default" type="button" onClick={(event)=>this._handleTodoAdd(event)}>
						                        <i className="fa fa-plus" aria-hidden="true"></i>
						                    </button>
						                </span>
									</div>
								</div>
							</div>

							<br/>

							<div className="row">
  								<div className="col-md-12">
  									<div className="btn-group pull-right">
									  	<button type="button" className="btn btn-default" onClick={(event)=>this._handleTodoListClear(event)}>Clear Done</button>
										<div className="btn-group">
									    	<button data-toggle="dropdown" className="btn btn-default dropdown-toggle">Filter <b className="caret"></b></button>
									    	<ul className="dropdown-menu">
									        	<li><a href="javascript:void(0);" onClick={(event)=>this._handleTodoFilter(event, 'all')}>All</a></li>
									        	<li><a href="javascript:void(0);" onClick={(event)=>this._handleTodoFilter(event, 'done')}>Done</a></li>
									        	<li><a href="javascript:void(0);" onClick={(event)=>this._handleTodoFilter(event, 'todo')}>Todo</a></li>
									    	</ul>
										</div>
									</div>
  									
  								</div>
							</div>

							<br/>

							<div className="row">
  								<div className="col-md-12">
									{((todoList) => {
			                            return todoList.map((todo, idx) => 
			                                    <TodoItem key={"todo_"+todo.id} actions={this.props.actions} todo={todo} filter={this.state.filter}/>
			                                )
			                        })(this.props.todoList)}
								</div>
							</div>
							
					    </div>	
				    </div>				  
				</div>	
			</section>
	    )
  	}
}

Q1Page.contextTypes = {
	router: React.PropTypes.object.isRequired
}

Q1Page.propTypes = {
  	actions: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    return {
        todoList: state.todoList
    }
}

export default connect(
    mapStateToProps
)(Q1Page)

