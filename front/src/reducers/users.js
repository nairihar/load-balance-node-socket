import { USERS, NEW_USER, DEL_USER } from '../configs/actionTypes';

const dState = [];

export default (state=dState, action) => {
  switch (action.type) {
    case USERS:
      return action.users;
    case NEW_USER:
      return [
        ...state,
        action.user
      ];
    case DEL_USER:
      return state.filter(({ socketId }) => socketId !== action.user.socketId);
    default:
      return state;
  }
};
