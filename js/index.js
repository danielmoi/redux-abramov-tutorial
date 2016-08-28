import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './configureStore';
import Root from './components/Root';

// Move configuration into configureStore.js

// We have to call `configureStore` to return the `store` object
const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
