// let's make our store and its associated functions (createStore, getState) from scratch

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

// let's create our createStore function
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);

    // call EACH listener (in our array) EVERY time an action is dispatched
    listeners.forEach(listener => listener());

  };

  const subscribe = (listener) => {
    // listeners becomes an array of functions
    listeners.push(listener);
    console.log(listeners);

    // not sure what this does
    return () => {
      listeners = listeners.filter(l => {
        l !== listener;
      });
    }
  };

  // call dispatch once, with an empty action, so that our state is returned
  // this essentially sets state = 0
  dispatch({});

  return { getState, dispatch, subscribe };
}

// Let's initialize our store
const store = createStore(counter);


const render = () => {
  document.body.innerText = store.getState();
}


store.subscribe(render);

// call it once
render();

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});
