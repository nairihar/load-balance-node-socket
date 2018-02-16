import { SocketSDK } from '../sdk';
import { MESSAGE, INVITE } from '../configs/actionTypes';

export const connectSocket = () => dispatch => {
  SocketSDK.connect({
    token: localStorage.accessToken
  });
  SocketSDK.on(SocketSDK.events.connect, () => {
    dispatch({
      type: MESSAGE,
      message: 'Socket connected'
    });
  });
};

export const invite = ({socketId, name}) => dispatch => {
  dispatch({
    type: MESSAGE,
    message: `Inviting ${name} ...`
  });
  SocketSDK.invite(socketId);
};

export const acceptInvite = socketId => dispatch => {
  SocketSDK.accept(socketId);
  dispatch({
    type: INVITE,
    inviteInfo: {},
  });
};

export const rejectInvite = socketId => dispatch => {
  SocketSDK.reject(socketId);
  dispatch({
    type: INVITE,
    inviteInfo: {},
  });
};
