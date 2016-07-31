// Now let's pass the STORE down #4 – via Provider from React-Redux
// The <Provider /> component is actually given in a library called React Redux
// These are React bindings to the Redux library

// We still need to define contextTypes for all components who want to opt-in to our Redux store

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



// Let's create our View Layer, using React
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

///////////////////////////////////////////////////////////////////////////////
//
// COMPONENTS

// Our FilterLink component to allow selection of a particular filtered view
// 'children' is the contents of the Link
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

class FilterLink extends Component {
  // we need this to keep this component's STATE with the Redux STORE
  componentDidMount() {
    const { store } = this.context;
    store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const { store } = this.context;
    // state here is the global Redux store
    const state = store.getState();
    return (
      <Link
        active={props.filter === state.visibilityFilter}
        onClick={() => {
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter,
          });
        }}
      >
        {props.children}
      </Link>
    )
  }
}
FilterLink.contextTypes = {
  store: React.PropTypes.object,
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
);

const AddTodo = (props, { store }) => {
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
          store.dispatch({
            type: 'ADD_TODO',
            text: input.value,
            id: nextTodoID++,
          });
          input.value = '';
        }}
      >
        Add Todo
      </button>
    </div>
  )
};
AddTodo.contextTypes = {
  store: React.PropTypes.object,
};

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


class VisibleTodoList extends Component {
  componentDidMount() {
    const { store } = this.context;
    store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();

    return (
      <TodoList
        todos={
          getVisibleTodos(
            state.todos,
            state.visibilityFilter,
          )
        }
        onTodoClick={id => {
          console.log('dispatching TOGGLE_TODO');
          store.dispatch({
            type: 'TOGGLE_TODO',
            id,
          });
        }}
      />
    );
  }
}

VisibleTodoList.contextTypes = {
  store: React.PropTypes.object,
};

///////////////////////////////////////////////////////////////////////////////



// global variable
let nextTodoID = 0;

const TodoApp = () => (
  <div>
    <AddTodo />

    <VisibleTodoList />

    <Footer />
  </div>
);


import { createStore } from 'redux';
import { Provider } from 'react-redux';


ReactDOM.render(
  <Provider store={createStore(todoApp)} >
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);
