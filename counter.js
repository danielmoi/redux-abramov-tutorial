const { createStore } = require ('redux');

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

// const { createStore } = Redux;

const myStore = createStore(counter);

console.log(myStore.getState());
