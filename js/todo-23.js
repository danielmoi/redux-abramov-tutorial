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



const getVisibleTodos = ( todos, filter ) => {
  switch(filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter( t => !t.completed );
    case 'SHOW_COMPLETED':
      return todos.filter( t => t.completed );
  }
};

const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li
    onClick={ onClick }
    style={ { textDecoration:
      completed ?
        'line-through' :
        'none'
      }}> { text } ( completed: { `${completed}` })
  </li>
);

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    { todos.map(todo =>
      <Todo
        key={ todo.id }
        {...todo}
        onClick={ () => onTodoClick(todo.id) }
      />

    )}
  </ul>
);

const AddTodo = ( {
  onAddClick
} ) => {
  let input;

  return (
    <div>
      <input ref={ node => {
          input = node;
        }}/>
      <button onClick={ () => {
          onAddClick(input.value);
          input.value = '';
        }}>
        Add Todo
      </button>
    </div>
  )
};

class VisibleTodoList extends Component {
  componentDidMount() {
    this.unsubscribe = myStore.subscribe( () =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const props = this.props;
    const state = myStore.getState();

    return (
      <TodoList
        todos={ getVisibleTodos(state.todos, state.visibilityFilter) }
        onTodoClick={ id => {
          myStore.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
        }}
      />

    )
  }
}

const Link = ({
  active,
  children,
  onClick
}) => {
  if (active) {
    return <span>{ children }</span>
  }

  return (
    <a href="#"
      onClick={ (e) => {
        e.preventDefault();
        onClick();

      }}
    >
      { children }
    </a>
  );
};

class FilterLink extends Component {
  componentDidMount() {
    this.unsubscribe = myStore.subscribe( () =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe()
  }
  render() {
    const props = this.props;
    const state = myStore.getState();
    return (
      <Link
        active={ props.filter === state.visibilityFilter }
        onClick={ () => {
          myStore.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }}>

        { props.children }

      </Link>
    );
  }
}

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

let nextTodoID = 0;

const TodoApp = ({
  todos,
  visibilityFilter
}) => (
  <div>
    <AddTodo
      onAddClick={ (text) => {
        myStore.dispatch({
          type: 'ADD_TODO',
          id: nextTodoID++,
          text
        });
      }}/>


    <VisibleTodoList />

    <Footer
      visibilityFilter={ visibilityFilter }
      onFilterClick={ filter => {
        myStore.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        })
      }
      }
    />
  </div>
);


const render = () => {
  ReactDOM.render(
    <TodoApp
      { ...myStore.getState() } />,
    document.getElementById('root')
  )
};

myStore.subscribe(render);
render();
