import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import todos from './todos';
import visibilityFilter from './visibilityFilter';

// ACTION CREATORS

let nextTodoID = 0;

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: (nextTodoID++).toString(),
  text
});

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
});



import { combineReducers } from 'redux';

const todoApp = combineReducers({
  // state-field: reducer responsible
  todos,
  visibilityFilter

})





//////////////////////////////////////////////////////////////////////////////

// LET'S DO STUFF





export const getVisibleTodos = ( todos, filter ) => {
  switch(filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter( t => !t.completed );
    case 'SHOW_COMPLETED':
      return todos.filter( t => t.completed );
  }
};
//////////////////////////////////////////////////////////////////////////////



let AddTodo = ( {dispatch} ) => {
  let input;

  return (
    <div>
      <input ref={ node => {
          input = node;
        }}/>
      <button onClick={ () => {
          dispatch(addTodo(input.value))
          input.value = '';
        }}>
        Add Todo
      </button>
    </div>
  )
};
AddTodo = connect()(AddTodo);


///////////////////////////////////////////////////////////////////////////////






///////////////////////////////////////////////////////////////////////////////


import { FilterLink } from './containers/FilterLink';


const Footer = () => {
  return (
    <p>
      Show:
      {' '}
      <FilterLink
        filter="SHOW_ALL"
      >
        ALL
      </FilterLink>

        {' '}

      <FilterLink
        filter="SHOW_ACTIVE"
      >
        ACTIVE
      </FilterLink>

        {' '}

      <FilterLink
        filter="SHOW_COMPLETED"
      >
        COMPLETED
      </FilterLink>
    </p>

  )
}

import { VisibleTodoList } from './containers/VisibleTodoList';

///////////////////////////////////////////////////////////////////////////////

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

///////////////////////////////////////////////////////////////////////////////

import { Provider } from 'react-redux';

///////////////////////////////////////////////////////////////////////////////

// STORE
import { createStore } from 'redux';


///////////////////////////////////////////////////////////////////////////////

ReactDOM.render(
  <Provider store={ createStore(todoApp) } >
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);
