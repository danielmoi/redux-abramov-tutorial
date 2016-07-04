const todos = (state=[], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      // return a new array
      // using the existing state, and the information provided in action
      // this is the same as using .concat()
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];

    case 'TOGGLE_TODO':
      return state.map(todo => {

        // if the todo isn't the one in question, just return the todo
        if (todo.id !== action.id) {
          return todo;
        }

        // if the todo is the one in question, return this new object as the todo
        // it will have all the original properties, AND we will modify one
        return {
          // copy all the properties from the todo to this new object
          ...todo,

          // override the completed property with this new one
          completed: !todo.completed
        };

      });
    // if the action isn't `ADD_TODO` or 'TOGGLE_TODO', don't do anything to `state`
    // this is because every reducer should return the current (not updated) state for any unknown action
    // this is because all reducers are called
    default:
      return state;
  }


};

const testTodos = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);

  console.log('testTodos passed');
};

const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Go Shopping',
      completed: false
    }
  ];

  // Actions contain the minimum amount of information
  // as such, this one doesn't need to include 'text' property
  const action = {
    type: 'TOGGLE_TODO',
    id: 1,
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Go Shopping',
      completed: true
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);

  console.log('testToggleTodo passed');


};

testTodos();
testToggleTodo();

console.log('All tests passed');
