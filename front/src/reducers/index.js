import { combineReducers } from 'redux';

import message from './message';
import user from './user';
import users from './users';
import * as game from './game';

export default combineReducers({
  message,
  user,
  users,
  ...game,
});
