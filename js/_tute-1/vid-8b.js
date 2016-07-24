// Let's add buttons!

import React from 'react';
import ReactDOM from 'react-dom';

const counter = (state = 0, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

import { createStore } from 'redux';

// create store, passing in the reducers that will manage update the state updates (app state)
const store = createStore(counter);

// create our Counter component
const Counter = ({
  value,
  onIncrement,
  onDecrement,
 }) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>Increment</button>
    <button onClick={onDecrement}>Decrement</button>
  </div>

);

// our render function
const render = () => {
  ReactDOM.render(
    // pass the current state of the store as a prop to our root component
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
      onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
    />,
    document.getElementById('root')
  );
};



// 3: subscribe()
// the callback gets called every time an action has been dispatched
store.subscribe(render);

// call it once
render();
