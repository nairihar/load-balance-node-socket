import io from 'socket.io-client';
import EventEmitter from 'events';

import { events } from './configs';

const url = `http://${process.env.SOCKET_HOST}:${process.env.SOCKET_PORT}`;

class SocketSDK extends EventEmitter {
  events = events.public;

  connect({ token }) {
    this.socket = io(url, {
      query: {
        token
      },
       transports: ['websocket']
    });

    this.socket.on(events.error, err => {
      console.error(err);
      alert('look console');
    });

    this.socket.on(events.connect, () => {
      console.log('connected');
      this.emit(this.events.connect);
    });

    this.socket.on(events.public.disconnect, () => {
      console.log('disconnected')
    });

    this.userListeners();
    this.gameListeners();
  }

  // need change to private function
  userListeners() {
    this.socket.on(this.events.users, data => {
      this.emit(this.events.users, data);
    });

    this.socket.on(events.newUser, data => {
      this.emit(this.events.newUser, data);
    });

    this.socket.on(events.delUser, data => {
      this.emit(this.events.delUser, data);
    });
  }

  // need change to private function
  gameListeners() {
    this.socket.on(events.invite, data => {
      this.emit(this.events.invite, data);
    });

    this.socket.on(events.accept, data => {
      this.emit(this.events.accept, data);
    });

    this.socket.on(events.reject, data => {
      this.emit(this.events.reject, data);
    });

    this.socket.on(events.gameInfo, data => {
      this.emit(this.events.gameInfo, data);
    });
  }

  invite(socketId) {
    this.socket.emit(events.invite, socketId);
  }

  accept(socketId) {
    this.socket.emit(events.accept, socketId);
  }

  reject(socketId) {
    this.socket.emit(events.reject, socketId);
  }

  play({n, v}) {
    this.socket.emit(events.play, {
      n,
      v,
    });
  }
}

export default new SocketSDK();
