import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './configureStore';
import Root from './components/Root';
import { fetchTodos } from './api';

// Move configuration into configureStore.js

fetchTodos('all')
  .then(todos =>
    console.log('todos:', todos)
)

// We have to call `configureStore` to return the `store` object
const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
