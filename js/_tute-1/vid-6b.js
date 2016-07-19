// extract out display state as a render function
// this is now our first working Redux application!

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

// our render function
const render = () => {
  document.body.innerText = store.getState();
}



// 3: subscribe()
// the callback gets called every time an action has been dispatched
store.subscribe(render);

// call it once
render();

// 2: dispatch()
// which accepts 1 argument: dispatch(action)
document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});
