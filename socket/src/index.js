import dotenv from 'dotenv';
dotenv.config();

import SocketIO from 'socket.io';
import SocketIORedis from 'socket.io-redis';
import SocketIOEmitter from 'socket.io-emitter';

import { connect } from './listeners';
import { events } from './configs';
import { validateConnection } from './helpers';

export const ioR = SocketIO(process.env.PORT);
ioR.adapter(SocketIORedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
}));

export const io = ioR.of('/');
export const ioEmitter = SocketIOEmitter({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

io.use(
  validateConnection
).on(events.connect, connect);

console.log(`API server running at ${process.env.PORT} port`);
