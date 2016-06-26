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

// create store
const myStore = createStore(counter);

// .getState method
console.log(myStore.getState());


// .dispatch method
myStore.dispatch({ type: 'INCREMENT' });

console.log(myStore.getState());

// .subscribe method
myStore.subscribe( () => {
  document.body.innerText = myStore.getState();
});

document.addEventListener('click', () => {
  myStore.dispatch({ type: 'INCREMENT' })
});
