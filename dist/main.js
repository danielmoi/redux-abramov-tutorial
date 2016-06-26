/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	// import React from 'react';
	// import ReactDOM from 'react-dom';

	// get `createStore` function from Redux
	// import { createStore } from 'redux';
	var _Redux = Redux;
	var createStore = _Redux.createStore;

	// our reducer

	var counter = function counter() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case 'INCREMENT':
	      return state + 1;
	    case 'DECREMENT':
	      return state - 1;
	    default:
	      return state;
	  }
	};

	// create store using `createStore` method
	var myStore = createStore(counter);

	// Counter component
	var Counter = function Counter(_ref) {
	  var value = _ref.value;
	  var onIncrement = _ref.onIncrement;
	  var onDecrement = _ref.onDecrement;
	  return React.createElement(
	    'div',
	    null,
	    React.createElement(
	      'h1',
	      null,
	      value
	    ),
	    React.createElement(
	      'button',
	      { onClick: onIncrement },
	      '+'
	    ),
	    React.createElement(
	      'button',
	      { onClick: onDecrement },
	      '-'
	    )
	  );
	};

	// our method to update the browser screen
	var _render = function _render() {
	  ReactDOM.render(React.createElement(Counter, {
	    value: myStore.getState(),
	    onIncrement: function onIncrement() {
	      return myStore.dispatch({ type: 'INCREMENT' });
	    },
	    onDecrement: function onDecrement() {
	      return myStore.dispatch({ type: 'DECREMENT' });
	    } }), document.getElementById('root'));
	};

	// every time our state changes (every time an action is dispatched), _render will be called
	myStore.subscribe(_render);

	// call _render once to render initial state
	_render();

/***/ }
/******/ ]);