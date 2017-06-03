// Import React and Redux Dependencies
import React from 'react';
import { render } from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// Import Local Dependencies
import reducers from './reducers/rootReducer';
import Routes from './routes/Routes';
import { getInitialEvents } from './utils/utils';

// Create the Store

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

getInitialEvents()
  .then(response => response.json())
  .then((events) => {
    const store = createStore(
      reducers,
      {
        events: {
          eventsList: events,
          visibleEvents: [],
        },
      },
      composeEnhancers(
        applyMiddleware(thunk),
        autoRehydrate(),
      ),
    );

    persistStore(store);

    render(
      <Provider store={store}>
        <Routes />
      </Provider>,
      document.getElementById('app'),
    );
  });