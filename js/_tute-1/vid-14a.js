// Reducer Composition – with Arrays

import expect from 'expect';
import deepFreeze from 'deep-freeze';

// a child reducer, that manages state of individual Todos
const todo = (state, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: action.completed || false,
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed,
      }
    default:
      return state;
  }
}

// our top-level reducer, that manages our entire state
const todos = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

// Let's create a store, so we can dispatch actions, and log them out
// (have deleted tests)
import { createStore } from 'redux';
const store = createStore(todos);

console.log('---------------')
console.log('Initial state:')
console.log(store.getState());

console.log('---------------')
console.log('Dispatching ADD_TODO.')
store.dispatch({
  type: 'ADD_TODO',
  id: 0,
  text: 'Learn Redux',
});

console.log('--------------')
console.log('Current state:')
console.log(store.getState());

console.log('---------------')
console.log('Dispatching ADD_TODO.')
store.dispatch({
  type: 'ADD_TODO',
  id: 1,
  text: 'Go Shopping',
});

console.log('--------------')
console.log('Current state:')
console.log(store.getState());

console.log('---------------')
console.log('Dispatching TOGGLE_TODO.')
store.dispatch({
  type: 'TOGGLE_TODO',
  id: 0,
});

console.log('--------------')
console.log('Current state:')
console.log(store.getState());

console.log('--------------')
