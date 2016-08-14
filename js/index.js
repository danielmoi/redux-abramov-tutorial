import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers';
import App from './components/App';

// Let's give our app some persisted initial state
// Note that visibilityFilter is `undefined`, and will be given `SHOW_ALL`
const persistedState = {
  todos: [{
    id: '0',
    text: 'Welcome back!',
    completed: false,
  }]
}


// Redux allows us to pass the persisted state as the 2nd argument
// The 1st argument is the root reducer
const store = createStore(
  todoApp,
  persistedState
);

console.log(store.getState())



ReactDOM.render(
  <Provider store={ store } >
    <App />
  </Provider>,
  document.getElementById('root')
);
