import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ADD_TODO } from '../actions/todos';
import { ADD_GOAL } from '../actions/goals';
import rootReducer from '../reducers';

const checker = store => next => action => {
  if ((action.type === ADD_TODO && action.todo.name.toLowerCase().includes('bitcoin')) ||
      (action.type === ADD_GOAL && action.goal.name.toLowerCase().includes('bitcoin'))) {
    return alert('Nope! That is a bad idea!')
  }

  return next(action);
};

const logger = store => next => action => {
  console.group(action.type);
  console.log('The action: ', action);
  const result = next(action);
  console.log('The new state is', store.getState());
  console.groupEnd();
  return result;
};

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk, checker, logger)
);
