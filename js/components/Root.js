import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { Router, Route, browserHistory } from 'react-router';

// a stateless functional component
const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/(:filter)' component={App} />
    </Router>
  </Provider>
);

Root.PropTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
