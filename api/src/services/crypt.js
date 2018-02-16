import bcrypt from 'bcrypt';

import { crypt } from '../configs';

export const hash = async (password) => {
  const hash = bcrypt.hash(password, crypt.salt);
  return hash;
};

export const compare = async ({password, pHash}) => {
  const res = bcrypt.compare(password, pHash);
  return res;
};
