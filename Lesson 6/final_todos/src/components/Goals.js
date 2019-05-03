import React from 'react';
import { connect } from 'react-redux';
import {
  handleAddGoal,
  handleRemoveGoal
} from '../actions/goals';

import List from './List';

class Goals extends React.Component {
  constructor(props) {
    super(props);

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  addItem(event) {
    event.preventDefault();
    this.props.dispatch(
      handleAddGoal(this.textInput.value, () => this.textInput.value = '')
    );
  }

  removeItem(goal) {
    this.props.dispatch(handleRemoveGoal(goal));
  }

  render() {
    return (
      <div>
        <h1>Goals list</h1>
        <input
          type="text"
          placeholder="Add goal"
          ref={input => this.textInput = input}
        />
        <button onClick={this.addItem}>Add Goal</button>

        <List
          items={this.props.goals}
          removeItem={this.removeItem}
        />
      </div>
    );
  }
}

export default connect((state) => {
  return { goals: state.goals };
})(Goals);
