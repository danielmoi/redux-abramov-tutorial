const { createStore } = Redux;

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

const render = () => {
  document.body.innerText = myStore.getState();
};

myStore.subscribe(render);

// call it to render initial state
render();

document.addEventListener('click', () => {
  myStore.dispatch({ type: 'INCREMENT' });
});
