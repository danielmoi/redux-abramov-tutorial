const todos = (state=[], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      // return a new array
      // using the existing state, and the information provided in action
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    // if the action isn't `ADD_TODO`, don't do anything to `state`
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

testTodos();

console.log('All tests passed');
