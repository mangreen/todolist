import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router';

import * as TodoActions from '../actions/todos';

class App extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const { actions, location } = this.props;

        return (
            <div>
                <ul className="sidebar-menu">
                    <li className={"treeview" + (location.pathname === "/" ? " active" : "")}>
                        <a href="/">
                            <span>Q1</span>
                        </a>
                    </li>
                    <li className={"treeview" + (location.pathname === "/" ? " active" : "")}>
                        <a href="/q2">
                            <span>Q2</span>
                        </a>
                    </li>
                </ul>

                <div className="wrapper">
                    {
                        React.cloneElement(this.props.children, {
                            actions: this.props.actions
                        })
                    }
                </div>
            </div>
        )
    }
}

App.contextTypes = {
    router: React.PropTypes.object.isRequired
}

App.propTypes = {
    actions: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    return {
        todoList: state.todoList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            todoActions: bindActionCreators(TodoActions, dispatch),
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
