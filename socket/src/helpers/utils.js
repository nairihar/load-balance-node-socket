import jwt from 'jsonwebtoken';
import { Token } from '../services';

export const validateConnection = (socket, next) => {
  try {
    if (socket.handshake.query && socket.handshake.query.token) {
      const expired = Token.checkExpired(socket.handshake.query.token);
      if (expired) {
        return next(new Error('Token expired'));
      }
      return next();
    }
    throw new Error('Authentication error');
  } catch(err) {
    console.log(err.message)
    next(err);
  }
};
