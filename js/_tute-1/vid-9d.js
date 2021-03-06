// let's add removeCounter
// now let's do with WITHOUT mutating state

import expect from 'expect';
import deepFreeze from 'deep-freeze';


const addCounter = (list) => {
  // list.push(0);
  // return list.concat([0]);

  // let's use ES6 spread operator
  return [...list, 0];
};

const removeCounter = (list, index) => {
  // list.splice(index, 1);

    // return list.slice(0, index)
  //   .concat(list.slice(index + 1));

  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)
  ]

}

const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];

  deepFreeze(listBefore);

  expect(
    addCounter(listBefore)
  ).toEqual(listAfter);
};

const testRemoveCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];

  deepFreeze(listBefore);

  expect(
    removeCounter(listBefore, 1)
  ).toEqual(listAfter);
}

testAddCounter();
testRemoveCounter();
console.log('all tests passed');
