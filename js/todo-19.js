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

// SUPER-REDUCER

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

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const FilterLink = ({
  filter,
  children
}) => {
  return (
    <a href="#"
      onClick={ (e) => {
        e.preventDefault();
        myStore.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        })
      }}>
        { children }
      </a>
  )
}

let nextTodoID = 0;

class TodoApp extends Component {
  render() {
    return (
      <div>
        <input ref={ node => {
            this.input = node;
          }}/>
        <button onClick={ () => {
            myStore.dispatch({
              type: 'ADD_TODO',
              text: this.input.value,
              id: nextTodoID++
            });
            this.input.value = '';
          }}>
          Add Todo
        </button>
        <ul>
          { this.props.todos.map( todo =>
              <li
                key={ todo.id}
                onClick={ () => {
                  myStore.dispatch({
                    type: 'TOGGLE_TODO',
                    id: todo.id
                  });
                }}
                style={ { textDecoration:
                  todo.completed ?
                    'line-through' :
                    'none'
                  }}> { todo.text } ( completed: { `${todo.completed}` })  </li>
            )}
        </ul>

        <p>
          Show:
          {' '}
          <FilterLink
            filter="SHOW_ALL">
              ALL
            </FilterLink>
            {' '}
          <FilterLink
            filter="SHOW_ACTIVE">
              ACTIVE
            </FilterLink>
            {' '}
          <FilterLink
            filter="SHOW_COMPLETED">
              COMPLETED
            </FilterLink>
        </p>

      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp
      todos={ myStore.getState().todos }
      visibilityFilter={ myStore.getState().visibilityFilter}/>,
    document.getElementById('root')
  )
};

myStore.subscribe(render);
render();
