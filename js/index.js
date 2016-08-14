import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers';
import App from './components/App';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

// Let's give our app some persisted initial state using local storage
// (instead of declaring an object literal)
const persistedState = loadState();


// Redux allows us to pass the persisted state as the 2nd argument
// The 1st argument is the root reducer
const store = createStore(
  todoApp,
  persistedState
);

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


console.log(store.getState())



ReactDOM.render(
  <Provider store={ store } >
    <App />
  </Provider>,
  document.getElementById('root')
);
