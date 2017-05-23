// Import Redux Components
import { combineReducers } from 'redux';

// Import Local Components
import events from './eventReducers';
import visibilityFilter from './visibilityFilter';

const rootReducer = combineReducers({
  events,
  visibilityFilter,
});

export default rootReducer;
