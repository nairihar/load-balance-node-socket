import mongoose from 'mongoose';
import Promise from 'bluebird';

mongoose.Promise = Promise;

export const connectMongo = () => {
  mongoose.connect(process.env.MONGO_URI);
};

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', err => {
  console.log(`MongoDB error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
  connectMongo();
});
