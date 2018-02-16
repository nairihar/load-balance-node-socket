import jwt from 'jsonwebtoken';

import { secrets } from '../configs';

export const generate = userId => {
  const accessToken = jwt.sign({userId}, secrets.jwt, { expiresIn: '1h' });
  return accessToken;
};

export const verify = token => {
  const res = jwt.verify(token, secrets.jwt);
  return res;
};

export const checkExpired = token => {
  const res = verify(token);
  const expired = Date.now() > res.exp;
  return expired;
};
