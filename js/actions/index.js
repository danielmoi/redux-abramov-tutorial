// ACTION CREATORS
import { v4 } from 'node-uuid';

// let nextTodoID = 0;

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
