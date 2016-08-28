import { createStore } from 'redux';
import todoApp from './reducers';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';


const configureStore = () => {

  // Let's give our app some persisted initial state using local storage
  // (instead of declaring an object literal)
  const persistedState = loadState();

  const addLoggingToDispatch = (store) => {
    if(!console.group) {
      return rawDispatch;
    }

    // dispatch is a function
    // we will extend it
    const rawDispatch = store.dispatch;

    // we return another function
    return (action) => {
      console.group(action.type);
      console.log('%c previous state:', 'color: gray', store.getState());
      console.log('%c action:', 'color: blue', action);
      // we call dispatch, as per usual
      const returnValue = rawDispatch(action);
      console.log('%c next state:', 'color: green', store.getState());
      console.groupEnd(action.type);
      return returnValue;
    };
  };


  // Redux allows us to pass the persisted state as the 2nd argument
  // The 1st argument is the root reducer
  const store = createStore(
    todoApp,
    persistedState
  );

  // this is an environment check
  if (process.env.NODE_ENV !== 'production') {
    // Implement logging, only if not production environment
    store.dispatch = addLoggingToDispatch(store);
  }

  // This adds a listener that will be called every time the store changes
  // (invoked on any state change)
  store.subscribe(throttle(() => {
    // get Redux store state using Redux getState()
    // We will only persis the data (todo list)
    // and NOT the UI state (visibility Filter)
    console.log('throttling...');
    saveState({
      todos: store.getState().todos,
    });
  }), 10000);

  return store;
};

export default configureStore;
