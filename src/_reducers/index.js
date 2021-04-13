import { combineReducers } from 'redux';

import { stocks } from './stocks.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  stocks,
  alert
});

export default rootReducer;