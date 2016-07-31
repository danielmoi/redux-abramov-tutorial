// Let's continue building the TodoApp component
// Let's continue FILTERING the Todos list
// Create a helper function, 'getVisibleTodos'
// and then we use this is only give 'visibleTodos' (filtered per the filter) to our app
// NB. we have to alter our render method, so that every prop in our state is passed through, we do this using the Object spread operator, instead of explictly declaring each one



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


const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](
        state[key],
        action,
      );
      return nextState;
    }, {})
  }
};

const todoApp = combineReducers({
  todos,
  visibilityFilter,
});

import { createStore } from 'redux';

// All we have to do is swap the top-level reducer!!!!
const store = createStore(todoApp);

// Let's create our View Layer, using React
import React, { Component } from 'react';
import ReactDOM from 'react-dom';


// Our FilterLink component to allow selection of a particular filtered view
// 'children' is the contents of the Link
const FilterLink = ({ filter, children}) => {
  return (
    <a
      href=""
      onClick={(e) => {
        e.preventDefault();
        console.log('dispatching SET_VISIBILITY_FILTER')
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter,
        });
      }}
    >
      {children}
    </a>
  )
};

const getVisibleTodos = (
  todos,
  filter,
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(todo => todo.completed === false);
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed === true);
  }
}

// global variable
let nextTodoID = 0;

class TodoApp extends Component {
  render() {
    const visibleTodos = getVisibleTodos(
      this.props.todos,
      this.props.visibilityFilter,
    );

    return (
      <div>
        <input
          ref={node => {
            this.input = node;
          }}
        />
        <button
          onClick={() => {
            store.dispatch({
              type: 'ADD_TODO',
              text: this.input.value,
              id: nextTodoID += 1,
            });
            this.input.value = '';
          }}
        >
          Add Todo
        </button>
        <ul>
          {visibleTodos.map(todo =>
            <li
              key={todo.id}
              onClick={() => {
                console.log('dispatching TOGGLE_TODO')
                store.dispatch({
                  type: 'TOGGLE_TODO',
                  id: todo.id,
                });
              }}
              style={{
                textDecoration: todo.completed ? 'line-through' : null,
              }}
            >
              Todo.text: {todo.text}
              Todo.id: {todo.id}
              Todo.completed: {todo.completed ? 'true' : 'false'}
            </li>
          )}
        </ul>
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
      </div>

    )
  }
}


// a render function that will update the DOM in response to the current application state
const render = () => {
  ReactDOM.render(
    <TodoApp
      {...store.getState()}
    />,
    document.getElementById('root')
  );
};

// EVERY TIME the store changes, we will call our render function!
store.subscribe(render);

// call it once to render the initial state
render();
