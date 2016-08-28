import React from 'react';
import { Footer } from './Footer';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';

const App = () => (
  <div>
    <AddTodo />
    <Footer />
    <VisibleTodoList />
  </div>
);

export default App;
