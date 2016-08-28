import React from 'react';
import { Footer } from './Footer';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';

const App = ({ params }) => (
  <div>
    <AddTodo />
    <Footer />
    <VisibleTodoList
      filter={params.filter || 'all'}
    />
  </div>
);

export default App;
