const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

const RECEIVE_DATA = 'RECEIVE_DATA';

// Action creators to avoid duplication
function addTodoAction(todo) {
  return { type: ADD_TODO, todo };
}

function removeTodoAction(id) {
  return { type: REMOVE_TODO, id };
}

function toggleTodoAction(id) {
  return { type: TOGGLE_TODO, id };
}

function addGoalAction(goal) {
  return { type: ADD_GOAL, goal };
}

function removeGoalAction(id) {
  return { type: REMOVE_GOAL, id };
}

function receiveDataAction(todos, goals) {
  return { type: RECEIVE_DATA, todos, goals };
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map(todo => {
        return todo.id === action.id
          ? { ...todo, complete: !todo.complete }
          : todo;
      });
    case RECEIVE_DATA:
      return action.todos;
    default:
      return state;
  }
}

function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat(action.goal);
    case REMOVE_GOAL:
      return state.filter(goal => goal.id !== action.id);
    case RECEIVE_DATA:
      return action.goals;
    default:
      return state;
  }
}

function loading(state = true, action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return false;
    default:
      return state;
  }
}
