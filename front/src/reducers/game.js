import { INVITE, GAME } from '../configs/actionTypes';

const inviteDState = {};

export const inviteInfo = (state=inviteDState, action) => {
  switch (action.type) {
    case INVITE:
      return action.inviteInfo;
    default:
      return state;
  }
};

const gameDState = {
  played: [[], []],
  players: [],
  start: false
};

export const game = (state=gameDState, action) => {
  switch (action.type) {
    case GAME:
      return action.game
    default:
      return state;
  }
};
