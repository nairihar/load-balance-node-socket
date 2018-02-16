import mongoose, { Schema } from 'mongoose';

import { Crypt } from '../services';
import { models } from '../configs';

const UserScheam = new Schema({
  name: String,
  password: String
});

UserScheam.pre('save', async function (next) {
  const passwordHash = await Crypt.hash(this.password);
  this.password = passwordHash;
  next();
});

export default mongoose.model(models.User, UserScheam);
