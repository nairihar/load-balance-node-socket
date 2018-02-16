import { USER_LOGIN, USER_LOGOUT } from '../configs/actionTypes';

const dState = {
  loggedIn: false
};

export default (state=dState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...action.user,
        loggedIn: true
      };
    case USER_LOGOUT:
      return {
        loggedIn: false
      };
    default:
      return state;
  }
};
