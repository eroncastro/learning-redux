import React from 'react';
import {
  handleAddTodo,
  handleRemoveTodo,
  handleToggleTodo
} from '../actions/todos';
import { connect } from 'react-redux';

import List from './List';

class Todos extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = React.createRef();
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
  }

  addItem(event) {
    event.preventDefault();
    this.props.dispatch(
      handleAddTodo(
        this.textInput.current.value,
        () => this.textInput.current.value = ''
      )
    );
  }

  removeItem(todo) {
    this.props.dispatch(handleRemoveTodo(todo));
  }

  toggleItem(todo) {
    this.props.dispatch(handleToggleTodo(todo));
  }

  render() {
    return (
      <div>
        <h1>Todo List</h1>
        <input
          type="text"
          placeholder="Add Todo"
          ref={this.textInput}
        />
        <button onClick={this.addItem}>Add Todo</button>

        <List
          items={this.props.todos}
          removeItem={this.removeItem}
          toggleItem={this.toggleItem}
        />
      </div>
    );
  }
}

const ConnectedTodos = connect((state) => {
  return { todos: state.todos };
})(Todos);

export default ConnectedTodos;
