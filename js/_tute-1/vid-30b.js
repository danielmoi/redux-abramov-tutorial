// Let's clean it all up

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';

//////////////////////////////////////////
// ACTION creators
// global variable
let nextTodoID = 0;

const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    text,
    id: nextTodoID++,
  }
}

const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter,
  }
}

const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id,
  }
}

/////////////////////////////////////
// REDUCERS
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



///////////////////////////////////////////////////////////////////////////////
//
// COMPONENTS

///////////////////////////////////////////////////////////////////////////////

// 1. ADD_TODO

// 1A. Presentational and Container Component
let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      <input
        ref={node => {
          input = node;
        }}
      />
      <button
        onClick={() => {
          dispatch(addTodo(input.value));
          input.value = '';
        }}
      >
        Add Todo
      </button>
    </div>
  )
};
AddTodo = connect()(AddTodo);


///////////////////////////////////////////////////////////////////////////////

// 2. TO DO LIST

// 2A. Helper function
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
// 2A-1. Presentational Component
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

// 2A-2. Presentational Component
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
);

const mapStateTo_TodoList_Props = state => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter,
    )
  }
};
const mapDispatchTo_TodoList_Props = dispatch => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    }
  }
}
// 2B. Container Component
const VisibleTodoList = connect(
  mapStateTo_TodoList_Props,
  mapDispatchTo_TodoList_Props,
)(TodoList);


///////////////////////////////////////////////////////////////////////////////

// 3. FILTER FOOTER

// 3A. Presentational Component
const Link = ({
  active,
  children,
  currentFilter,
  onClick,
}) => {
  if (active) {
    return (
      <span
        style={{
          color: active ? 'tomato' : null,
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
        onClick();
      }}
      style={{color: 'gray'}}
    >
      {children}
    </a>
  )
};
const mapStateTo_Link_Props = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
};
const mapDispatchTo_Link_Props = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    },
  }
};
// 3B. Container Component
const FilterLink = connect(mapStateTo_Link_Props, mapDispatchTo_Link_Props)(Link);


// 3C. Presentational Component
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
};

///////////////////////////////////////////////////////////////////////////////

// Top Level Component
const TodoApp = () => (
  <div>
    <AddTodo />

    <VisibleTodoList />

    <Footer />
  </div>
);

// Let's render it!
ReactDOM.render(
  <Provider store={createStore(todoApp)} >
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);
