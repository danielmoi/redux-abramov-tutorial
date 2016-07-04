// our own `createStore` method
const createStore = (reducer) => {
  // keep our state in a variable
  let state;

  // keep track of all the change listeners,
  // because the `subscribe` function can be called many times
  let listeners = [];

  // our `getState` method: returns our state (implicit return)
  const getState = () => state;

  // our `dispatch` method
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach( listener => listener() );
  };

  // our `subscribe` method
  const subscribe = (listener) => {
    listeners.push(listener);

    // Instead of adding a dedicated `unsubscribe` method, we'll just return a function from subscribe method.
    return () => {
      listeners = listeners.filter( l => l !== listener);
    };
  };

  // Finally, by the time the store is returned, we want it to have the initial state populated, so we're going to dispatch a dummy action, just to get the reducer to return the initial value
  dispatch( {} );

  // returns an object with 3 functions
  // this object is called our Redux STORE
  return { getState, dispatch, subscribe };
};
