import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'

class TodoItem extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            editable: false,
            text: this.props.text
        }
    }

    _handleCheckboxChange(event) {
        this.props.actions.todoActions.updateTodo({
            id: this.props.todo.id,
            done: event.currentTarget.checked
        });
    }

    _handleEditableChange(event) {
        this.setState({
            editable: !this.state.editable
        });
    }

    _handleInputChange(event) {
        this.setState({
            text: this.state.text
        });
    }

    _handleInputSave(event) {
        this.props.actions.todoActions.updateTodo({
            id: this.props.todo.id,
            text: this.state.text
        });

        this.setState({
            editable: !this.state.editable
        });
    }

    _handleEditableChange(event) {
        this.setState({
            editable: !this.state.editable
        });
    }

    _handleTodoDelete(event) {
        this.props.actions.todoActions.deleteTodo(this.props.todo.id);
    }

    render() {
        let hidden = '';
        if (this.props.filter === 'done' && this.props.todo.done) {
            hidden = '';
        } else if (this.props.filter === 'done' && !this.props.todo.done) {
            hidden = 'hidden';
        } else if (this.props.filter === 'todo' && this.props.todo.done) {
            hidden = 'hidden';
        } else if (this.props.filter === 'todo' && !this.props.todo.done) {
            hidden = '';
        }

    	return (
            <div className={"input-group " + hidden}>
                <span className="input-group-addon">
                    <input type="checkbox" checked={this.props.todo.done} onChange={(event)=>this._handleCheckboxChange(event)}/>
                </span>

                {((editable) => {
                    if (editable) {
                        return  <input type="text" className="form-control" defaultValue={this.props.todo.text} onChange={(event)=>this._handleInputChange(event)}/>
                    } else {
                        return <input type="text" className="form-control" value={this.props.todo.text} disabled style={
                                    this.props.todo.done ? {'textDecoration': 'line-through'} : {}
                                }/>
                    }
                })(this.state.editable)}

                
                {((editable) => {
                    if (editable) {
                        return <span className="input-group-btn">
                                    <button className="btn btn-default" type="button" onClick={(event)=>this._handleInputSave(event)}>
                                        <i className="fa fa-save" aria-hidden="true"></i>
                                    </button>
                                </span>                    
                    } else {
                        return <span className="input-group-btn">
                                    <button className="btn btn-default" type="button" onClick={(event)=>this._handleEditableChange(event)}>
                                        <i className="fa fa-pencil" aria-hidden="true"></i>
                                    </button>
                                </span>
                    }
                })(this.state.editable)}

                {((editable) => {
                    if (!editable) {
                        return  <span className="input-group-btn">
                                    <button className="btn btn-default" type="button" onClick={(event)=>this._handleTodoDelete(event)}>
                                        <i className="fa fa-trash" aria-hidden="true"></i>
                                    </button>
                                </span>
                    }
                })(this.state.editable)}

            </div>
        )
    }
}

TodoItem.propTypes = {
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        todoList: state.todoList
    }
}

export default connect(
    mapStateToProps
)(TodoItem)


