// Reducer Composition – with Objects
// This is because we want our app state to be an object (with 2 keys: todos, and visibilityFilter)

import expect from 'expect';
import deepFreeze from 'deep-freeze';

// a Level 3 reducer
// manages the state for individual Todos
// note that `state` here refers to `state.todos[i]` ( from the main app's point of view)
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

// a Level 2 reducer, manages the `todos` part of state
// note that `state` here refers to `state.todos` (from the main app's point of view)
// calls 1 child reducer (`todo`)
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

// a Level 2 reducer, manages the visibilityFilter part of state
// note that `state` here refers to `state.visibilityFilter` (from the main app's point of view)
const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch(action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};


// our new top-level (Level 1) reducer, calls 2 child reducers
// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(state.todos, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//   };
// };

// let's use combineReducers instead, as a shorthand method of specifying which reducers will handle particular parts of our state
// It lets us specify the mapping between the state field names, and the reducers managing them
// The return value is a reducer function
// NB. we are using ES6's object literal shorthand notation because our keys and values have the same name
import { combineReducers } from 'redux';
const todoApp = combineReducers({
  todos,
  visibilityFilter,
});

import { createStore } from 'redux';

// All we have to do is swap the top-level reducer!!!!
const store = createStore(todoApp);

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

// Now let's dispatch a visibilityFilter action
console.log('---------------')
console.log('Dispatching SET_VISIBILITY_FILTER.')
store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED',
});

console.log('--------------')
console.log('Current state:')
console.log(store.getState());

console.log('--------------')
