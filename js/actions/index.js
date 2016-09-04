// ACTION CREATORS
import { v4 } from 'node-uuid';

// let nextTodoID = 0;

import * as api from '../api'

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  // id: (nextTodoID++).toString(),
  id: v4(),
  text
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
});


export const fetchTodos = (filter) => (
  api.fetchTodos(filter)
    .then(response => (
      receiveTodos(filter, response)
    ))
);


const receiveTodos = (filter, todos) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response: todos,
});
