// import React from 'react';
// import ReactDOM from 'react-dom';

// get `createStore` function from Redux
// import { createStore } from 'redux';
const { createStore } = Redux;

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
const Counter = ({
  value,
  onIncrement,
  onDecrement
}) => (
  <div>
    <h1>{ value }</h1>
    <button onClick={ onIncrement }>+</button>
    <button onClick={ onDecrement }>-</button>
  </div>
);

// our method to update the browser screen
const _render = () => {
  ReactDOM.render(
    <Counter
      value={ myStore.getState() }
      onIncrement={ () => myStore.dispatch( { type: 'INCREMENT'} ) }
      onDecrement={ () => myStore.dispatch( { type: 'DECREMENT'} ) }/>,
    document.getElementById('root')
  )
};

myStore.subscribe(_render);

// call it to render initial state
_render();
