// create addCounter
// let's make it so that it WON'T mutate state

import expect from 'expect';
import deepFreeze from 'deep-freeze';


const addCounter = (list) => {
  // return list.concat([0]);

  // let's use ES6 spread operator
  return [...list, [0]];
};

const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];

  deepFreeze(listBefore);

  expect(
    addCounter(listBefore)
  ).toEqual(listAfter);
};

testAddCounter();
console.log('all tests passed');
