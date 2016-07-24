// Avoiding object mutations with Object.assign and spread

import expect from 'expect';
import deepFreeze from 'deep-freeze';

/*
const toggleTodo = (todo) => {
  todo.completed = !todo.completed;
  return todo;
};
*/

/*
const toggleTodo = (todo) => {
  return Object.assign({}, todo,
    { completed: !todo.completed }
  );
};
*/

const toggleTodo = (todo) => {
  return {
    ...todo,
    completed: !todo.completed,
  };
};

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: 'Learn Redux',
    completed: false,
  };
  const todoAfter = {
    id: 0,
    text: 'Learn Redux',
    completed: true,
  };

  deepFreeze(todoBefore);

  expect(
    toggleTodo(todoBefore)
  ).toEqual(todoAfter);
};

testToggleTodo();
console.log('All tests passed');
