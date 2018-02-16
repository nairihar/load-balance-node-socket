import { SocketSDK } from '../sdk';

export const play = ({n, v}) => dispatch => {
  SocketSDK.play({
    n,
    v: parseInt(v),
  });
};
