function counter(state, action) {
  if (typeof state === 'undefined') {
    return 0;
  }
  if (action.type === 'INCREMENT') {
    return state + 1;
  } else if (action.type === 'DECREMENT') {
    return state - 1;
  } else {
    return state;
  }
}

// our test assertions to cover all situations
// 1. incrementing
expect(
  counter(0, { type: 'INCREMENT' })
).toEqual(1);

expect(
  counter(1, { type: 'INCREMENT' })
).toEqual(2);

// 2. decrementing
expect(
  counter(2, { type: 'DECREMENT' })
).toEqual(1);

expect(
  counter(1, { type: 'DECREMENT' })
).toEqual(0);

// 3. unrecognised action
expect(
  counter(1, { type: 'BLAHBLAH' })
).toEqual(1);

// 4. undefined initial state, and unspecified action
expect(
  counter(undefined, {})
).toEqual(0);

// if we get here, all tests have passed
console.log('Tests passed');
