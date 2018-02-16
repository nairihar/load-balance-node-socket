import { MESSAGE } from '../configs/actionTypes';

const dState = '';

export default (state=dState, action) => {
  switch (action.type) {
    case MESSAGE:
      return action.message;
    default:
      return state;
  }
};
