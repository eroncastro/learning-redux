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
function reducer(state = [], action) {
  if (action.type === 'ADD_TODO') {
    return state.concat([action.todo]);
  }

  return state;
}

const store = createStore([], reducer);

store.subscribe(() => {
  console.log('The new state is: ', store.getState());
});

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false
  }
});
