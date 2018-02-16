import { SocketSDK } from '../sdk';
import { USERS, NEW_USER, DEL_USER, INVITE, MESSAGE, GAME } from '../configs/actionTypes';

export const socketListeners = dispatch => {
  SocketSDK.on(SocketSDK.events.users, users => {
    dispatch({
      type: USERS,
      users
    });
  });

  SocketSDK.on(SocketSDK.events.newUser, user => {
    dispatch({
      type: NEW_USER,
      user
    });
  });

  SocketSDK.on(SocketSDK.events.delUser, user => {
    dispatch({
      type: DEL_USER,
      user
    });
  });

  SocketSDK.on(SocketSDK.events.invite, ({name, socketId}) => {
    dispatch({
      type: INVITE,
      inviteInfo: {
        name,
        socketId
      },
    });
  });

  SocketSDK.on(SocketSDK.events.reject, name => {
    dispatch({
      type: MESSAGE,
      message: 'Invitation rejected'
    });
  });

  SocketSDK.on(SocketSDK.events.accept, name => {
    dispatch({
      type: MESSAGE,
      message: 'Starting game ...'
    });
  });

  SocketSDK.on(SocketSDK.events.gameInfo, game => {
    dispatch({
      type: GAME,
      game
    });
    dispatch({
      type: MESSAGE,
      message: ''
    });
  });
};
