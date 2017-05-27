// Import React and Redux Dependencies
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// Import Local Dependencies
import reducers from './reducers/rootReducer.js';
import Routes from './routes/Routes';

// Create the Store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk),
));

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app'),
);
