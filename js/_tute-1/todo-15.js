///////////////////////////////////////////////////////////////////////////////

// REDUCER
// This manages main-state
// In this case, state is an ARRAY
// This is the single top-level reducer
const todos = (state=[], action) => {
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

///////////////////////////////////////////////////////////////////////////////

// REDUCER
// This manages sub-state
// In this case, each element in the main state array
// Each state here is an OBJECT
const todo = (state, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      };

    default:
      return state;
  }
};


///////////////////////////////////////////////////////////////////////////////

// REDUCER
// Sets a visibility filter for the ENTIRE app
const visibilityFilter = ( state = 'SHOW_ALL', action ) => {
  switch(action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};


///////////////////////////////////////////////////////////////////////////////

// OLD super-reducer

// const todoApp = ( state={}, action) => {
//   return {
//     todos: todos( state.todos, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//   };
// };

///////////////////////////////////////////////////////////////////////////////

// NEW super-reducer

import { combineReducers } from 'redux';

const todoApp = combineReducers({
  // state-field: reducer responsible
  todos,
  visibilityFilter

})

///////////////////////////////////////////////////////////////////////////////

// STORE
import { createStore } from 'redux';

const myStore = createStore(todoApp);
// when the store is created, our reducer is called
// our state and action are undefined
// 1. todos: because `action` is undefined, this will trigger the `default` case, and we are returned state (which has a default of empty array [])
// 2. visibilityFilter: because `action` is undefined, this will trigger the `default` case, and we are returned state (which has a default of `SHOW_ALL`)

///////////////////////////////////////////////////////////////////////////////

// LET'S DO STUFF

// Initial state
console.log('Initial state:');
console.log(myStore.getState());
console.log('----------------');

// Add a todo
console.log('Dispatching ADD_TODO');
myStore.dispatch({
  type: 'ADD_TODO',
  id: 0,
  text: 'Learn Redux'
});
console.log('Current state:');
console.log(myStore.getState());
console.log('----------------');

// Add another todo
console.log('Dispatching ADD_TODO');
myStore.dispatch({
  type: 'ADD_TODO',
  id: 1,
  text: 'Go Shopping'
});
console.log('Current state:');
console.log(myStore.getState());
console.log('----------------');

// Toggle todo
console.log('Dispatching TOGGLE_TODO');
myStore.dispatch({
  type: 'TOGGLE_TODO',
  id: 0
});
console.log('Current state:');
console.log(myStore.getState());
console.log('----------------');

//
console.log('Dispatching SET_VISIBILITY_FILTER');
myStore.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
});
console.log('Current state:');
console.log(myStore.getState());
console.log('----------------');


///////////////////////////////////////////////////////////////////////////////
const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);

  console.log('testAddTodo passed');
};

const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Go Shopping',
      completed: false
    }
  ];

  // Actions contain the minimum amount of information
  // as such, this one doesn't need to include 'text' property
  const action = {
    type: 'TOGGLE_TODO',
    id: 1,
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Go Shopping',
      completed: true
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);

  console.log('testToggleTodo passed');


};

testAddTodo();
testToggleTodo();

console.log('All tests passed');
