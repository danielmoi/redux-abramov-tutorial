import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleTodo } from '../actions';
import { getVisibleTodos } from '../reducers';
import TodoList from './TodoList';





const mapStateToTodoListProps = (state, { params }) => ({
  todos: getVisibleTodos(
    state,
    params.filter || 'all',
  )
});

const VisibleTodoList = withRouter(connect(
  mapStateToTodoListProps,
  { onTodoClick: toggleTodo },
)(TodoList));

export default VisibleTodoList;
