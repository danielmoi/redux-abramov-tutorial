/**** Numbers ****/

var returnVarNum = function() {
  var x = 9;
  return x;
};
// 9

var returnNum = function() {
  return 8;
};
// 8

/**** Booleans ****/

var returnVarBool = function() {
  var y = true;
  return y;
};
// true

var returnBool = function() {
  return false;
};
// false

/**** Objects ****/

var returnVarObj = function() {
  x = { name: 'Tom' };
  return x;
};
// Object {name: "Tom"}

var returnObj = function() {
  return {
    name: 'Sally'
  };
};
// Object {name: "Sally"}

/**** Arrays ****/

var returnVarArr = function() {
  x = [0, 1, 2];
  return x;
};
// [0,1,2]

var returnArr = function() {
  return [3, 4, 5];
};
// [3,4,5]

/**** Strings ****/

var returnStr = function() {
  return 'Hotdog';
};
// "Hotdog"

var returnVarStr = function() {
  var z = "Butterfly";
  return z;
};
// "Butterfly"


/**** Functions ****/

var returnVarFunc = function() {
  var x = function() {
    console.log('Hello');
  }
  return x;
};
// function () {
//   console.log('Hello');
// }


var returnFunc = function() {
  return function() {
    console.log('World');
  };
};
// function () {
//   console.log('World');
// }

var returnFuncIIFE = function() {
  return (function() {
    console.log('World');
  })();
};
// 'World'
// 'undefined'
// This is an anonymous function that is immediately executed (when returnFuncIIFE is invoked)
// The return of THAT function call is returned
// Note that the there is no return value for the returned function, which is why we get 'undefined' (the console.log is a side effect)

var returnFuncInvoked = function() {
  return Math.random(0, 10);
};
// 0.989746059504268
// This is a native function that is immediately executed when `returnFuncInvoked` is invoked
// The return of THAT function call is returned


/**** More ****/

// Return an array
// (the value of the variable `arr`)
const addItem = (arr) => {
  arr.push(0);
  return arr;
};

// Return an array
// the return of calling .concat() on the variable `arr`
// (this concatenates `arr` (which is an array) and [0])
const addItem = (arr) => {
  return arr.concat([0]);
};

// Return an array
// we are composing the array in the return statement
// we are composing it with 2 elements: `arr` (after it has been spread open by `...`), and 0
const addItem = (arr) => {
  return [...arr, 0];
};


///////// Return with parentheses (re: JSX)

// Parentheses are used as a grouping operator
// These functions are all valid JS
// And the parentheses are optional, used for readability
const funcParens1 = () => {
  return (3 + 4);
};

const funcParens2 = () => {
  return (3
          + 4
  );
};

const funcNoParens = () => {
  return 3
          + 4
  ;
};

// But parentheses are essential for outputting JSX
// Primarily because JSX is a multi-line return
// And to allow the transpiler to know what to transpile into JS
const Cart = React.createClass({
  render() {
    return (
      <h1>Hello there</h1>
      <p>Butterflies</p>
    )
  }
});


///////// SPREAD OPERATOR //////////////

// Without spread
// This returns a nested array
const addItem = (arr) => {
  return [arr, 0];
};
// addItem([1,2]);
// [Array[2], 0]


// With spread
// This returns a flat array
// As if `arr` had been unpackaged (spread open) before being added to the array!
const addItem = (arr) => {
  return [...arr, 0];
};
// addItem([1,2]);
// [1,2,0];
