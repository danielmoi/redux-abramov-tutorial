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

// get `createStore` method from Redux
const { createStore } = Redux;

// our own `createStore` method
const createStore = (reducer) => {
  // keep our state in a variable
  let state;

  // our `getState` method: returns our state (implicit return)
  const getState = () => state;

  // our `dispatch` method
  const dispatch = (action) => {

  };

  // our `subscribe` method
  const subscribe = (listener) => {

  };

  // returns an object with 3 functions
  // this object is called our Redux STORE
  return { getState, dispatch, subscribe };
};




// create store using `createStore` method
const myStore = createStore(counter);

const render = () => {
  document.body.innerText = myStore.getState();
};

myStore.subscribe(render);

// call it to render initial state
render();

document.addEventListener('click', () => {
  myStore.dispatch({ type: 'INCREMENT' });
});
