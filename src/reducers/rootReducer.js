// Import Redux Dependencies
import { combineReducers } from 'redux';

// Import Local Dependencies
import events from './events';
import user from './user';

// Create the Root Reducer
const rootReducer = combineReducers({
  events,
  user,
});

export default rootReducer;
