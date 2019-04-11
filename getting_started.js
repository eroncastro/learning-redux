/**
 * We want the state management of our apps to be predictable.
 *
 * One of the key points of Redux is that all of the data is stored in
 * a single object called the state tree.
 *
 * Now that we have our state defined in a single object, we need to
 * establish a way in which we can interact with it.
 *
 * Basically, we need 3 things:
 * 1. Get the state
 * 2. Listen for changes
 * 3. Update the state
 *
 * Now, we can define what a store is. It is a structure composed
 * by the state tree + operations (get the state + listen for changes + update the state).
 *
 * Below, we create a store from scratch.
 */

 /**
  * The store has fours parts:
  * 1. The state tree
  * 2. A way to get the state
  * 3. A way to listen for changes on the state
  * 4. A way to update the state
  *
  * Rules for updating the state:
  * 1. Only an event change the state of our store.
  * 2. The function that returns the new state needs to be a pure function. This function is called a reducer.
  */

// Actions as constants are less error prone.
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

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

function createStore(initialState, reducer) {
  let state = initialState;
  let listeners = [];

  const getState = () => state;

  const subscribe = listener => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter(l => l !== listener)
    };
  };

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  return {
    getState,
    subscribe,
    dispatch
  };
}

/**
 * This reducer function is a pure function, which means:
 * 1. It returns the same result if the same arguments are passed in;
 * 2. It depends solely on the arguments passed to it;
 * 3. It does not produce side effects, such as API requests or I/O operations.
 *
 * It receives the state and an action and reduces them to a brand new state.
 * - The action represents an event that will change the state of our store.
 */
function todos(state = [], action) {
  switch (action && action.type) {
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
    default:
      return state;
  }
}

function goals(state = [], action) {
  switch (action && action.type) {
    case ADD_GOAL:
      return state.concat(action.goal);
    case REMOVE_GOAL:
      return state.filter(goal => goal.id !== action.id);
    default:
      return state;
  }
}

function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  };
}

const store = createStore({}, app);

store.subscribe(() => {
  console.log('The new state is: ', store.getState());
});

store.dispatch(addTodoAction({
  id: 0,
  name: 'Walk the dog',
  complete: false
}));

store.dispatch(addTodoAction({
  id: 1,
  name: 'Wash the car',
  complete: false
}));

store.dispatch(addTodoAction({
  id: 2,
  name: 'Go to the gym',
  complete: true
}));

store.dispatch(removeTodoAction(1));

store.dispatch(toggleTodoAction(0));

store.dispatch(addGoalAction({
  id: 0,
  name: 'Learn Redux'
}));

store.dispatch(addGoalAction({
  id: 1,
  name: 'Lose 20 pounds'
}));

store.dispatch(removeGoalAction(0));
