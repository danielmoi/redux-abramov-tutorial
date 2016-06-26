import React from 'react';
import ReactDOM from 'react-dom';

// get `createStore` function from Redux
import { createStore } from 'redux';

// our reducer
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}


// create store using `createStore` method
const myStore = createStore(counter);

// Counter component
const Counter = ( { value } ) => (
  <h1>{ value }</h1>
);

// our method to update the browser screen
const _render = () => {
  ReactDOM.render(
    <Counter value={ myStore.getState() }/>,
    document.getElementById('root')
  )
};

myStore.subscribe(_render);

// call it to render initial state
_render();
