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
///////////////////////////////////////////////////////////////////////////////

const AddTodo = ( props, { store } ) => {
  let input;

  return (
    <div>
      <input ref={ node => {
          input = node;
        }}/>
      <button onClick={ () => {
          store.dispatch({
            type: 'ADD_TODO',
            id: nextTodoID,
            text: input.value
          })
          input.value = '';
        }}>
        Add Todo
      </button>
    </div>
  )
};

AddTodo.contextTypes = {
  store: React.PropTypes.object
};


///////////////////////////////////////////////////////////////////////////////

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

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch({
        type: 'TOGGLE_TODO',
        id
      })
    }
  }
}

import { connect } from 'react-redux';

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);


///////////////////////////////////////////////////////////////////////////////
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
    const { store } = this.context;
    this.unsubscribe = store.subscribe( () =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe()
  }
  render() {
    const { store } = this.context;
    const props = this.props;
    const state = store.getState();
    return (
      <Link
        active={ props.filter === state.visibilityFilter }
        onClick={ () => {
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }}>

        { props.children }

      </Link>
    );
  }
}

FilterLink.contextTypes = {
  store: React.PropTypes.object
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
}

let nextTodoID = 0;





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
