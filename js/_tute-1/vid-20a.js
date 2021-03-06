// Our Todo App is now complete
// We have a single component right now
// Now let's Extract Presentational Components
// #1: Todo, TodoList
// Let's make our Todo component not specify any specific behaviour
// Remove the ref
// This is why we will move our function out as well
// We'll do the same for our TodoList component - it will also be a 'presentational component'



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

///////////////////////////////////////////////////////////////////////////////
//
// COMPONENTS

// Our FilterLink component to allow selection of a particular filtered view
// 'children' is the contents of the Link
const FilterLink = ({ filter, children, currentFilter }) => {
  if (filter === currentFilter) {
    return (
      <span
        style={{
          color: currentFilter === filter ? 'tomato' : null,
        }}
      >
        {children}
      </span>
    );
  }
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
      style={{color: 'gray'}}
    >
      {children}
    </a>
  )
};


const Todo = ({
  onClick,
  completed,
  text,
  id,
}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : null,
    }}
  >
    Todo.text: {text}
    Todo.id: {id}
    Todo.completed: {completed ? 'true' : 'false'}
  </li>
);

const TodoList = ({
  todos,
  onTodoClick,
}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
)

///////////////////////////////////////////////////////////////////////////////

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
    const {
      todos,
      visibilityFilter,
    } = this.props;

    const visibleTodos = getVisibleTodos(
      todos,
      visibilityFilter,
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

        <TodoList
          todos={visibleTodos}
          onTodoClick={id => {
            console.log('dispatching TOGGLE_TODO')
            store.dispatch({
              type: 'TOGGLE_TODO',
              id,
            });
          }}
        />

        <p>
          Show:
          {' '}
          <FilterLink
            filter="SHOW_ALL"
            currentFilter={visibilityFilter}
          >
           ALL
         </FilterLink>
         {' '}
          <FilterLink
            filter="SHOW_ACTIVE"
            currentFilter={visibilityFilter}
          >
           ACTIVE
         </FilterLink>
         {' '}
          <FilterLink
            filter="SHOW_COMPLETED"
            currentFilter={visibilityFilter}
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
