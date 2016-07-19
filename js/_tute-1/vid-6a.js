// dispatch action every time we click

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


// let's use Redux's methods
// 1: getState()
console.log(store.getState());

// 2: dispatch()
// which accepts 1 argument: dispatch(action)
store.dispatch({ type: 'INCREMENT' });
console.log(store.getState());

// 3: subscribe()
// the callback gets called every time an action has been dispatched
store.subscribe(() => {
  document.body.innerText = store.getState();
});

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});
