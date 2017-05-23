// Import React Components
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { render } from 'react-dom';
import { hashHistory, Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { routerReducer, routerMiddleware } from 'react-router-redux';


// Import Local Components
import App from './Components/App/App.jsx';
import Events from './Components/Events/Events.jsx';
import UserProfile from './Components/UserProfile/UserProfile.jsx';
import rootReducer from './Reducers/rootReducer.js';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history, thunkMiddleware);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...rootReducer,
    router: routerReducer
  }),
  applyMiddleware(middleware)
);

render(
  <Provider store={store}>
    <HashRouter basename="/" component={App}>
      <Switch>
        <Route path="/users" component={UserProfile} />
        <Route path="/events" component={Events} />
        <Route path={HashRouter.basename} component={App} />
      </Switch>
    </HashRouter>
  </Provider>, document.getElementById('app')
);
