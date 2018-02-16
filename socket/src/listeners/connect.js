import Promise from 'bluebird';

import { io, ioEmitter } from '../';
import { RedisClient } from '../db';
import { playerJoinRoom, getPlayer, getRoom, saveRoom, createPlayer } from '../helpers';
import { events, gameResults } from '../configs';
import { Token } from '../services';

const disconnect = async socket => {
  await RedisClient.delAsync(socket.id);
  socket.broadcast.emit(events.delUser, {
    socketId: socket.id
  });
};

export const connect = async socket => {
  console.log(`${socket.id} connected`);

  const { name } = Token.verify(socket.handshake.query.token);

  await createPlayer(socket.id, {
    name
  });

  socket.broadcast.emit(events.newUser, {
    socketId: socket.id,
    name,
  });

  io.adapter.clients(async (err, clients) => {
    if (err) {
      return console.error(err);
    }
    const clientsPromises = clients.map(async socketId => {
      const { name } = await getPlayer(socketId);
      return {
        socketId,
        name,
      };
    });
    const clientsData = await Promise.all(clientsPromises);
    socket.emit(events.users, clientsData);
  });

  socket.on(events.invite, socketId => {
    console.log(`Invite ${socketId}`);
    ioEmitter.to(socketId).emit(events.invite, {
      name,
      socketId: socket.id
    });
  });

  socket.on(events.accept, async socketId => {
    const playersIndex = [socket.id, socketId];
    const roomId = playersIndex.join(',');
    const players = [name];
    const played = [[], []];
    const start = true;

    const secondPlayer = await getPlayer(socketId);
    players.push(secondPlayer.name);

    await saveRoom(roomId, {
      playersIndex,
      played,
      start,
      players
    });

    playersIndex.forEach(sId => {
      playerJoinRoom(sId, roomId); // async
      ioEmitter.to(sId).emit(events.gameInfo, {
        start,
        playersIndex,
        played,
        players,
      });
    });
  });

  socket.on(events.play, async ({n, v}) => {
    const playerData = await getPlayer(socket.id);
    if (!playerData.roomId) {
      return console.log('ERROR: roomId not fount in playerData');
    }
    const roomData = await getRoom(playerData.roomId);
    if (gameResults[n] !== v) {
      return;
    }
    const playerIndex = roomData.playersIndex.indexOf(socket.id);
    roomData.played[playerIndex][n] = true;
    await saveRoom(playerData.roomId, roomData);

    roomData.playersIndex.forEach(sId => {
      ioEmitter.to(sId).emit(events.gameInfo, roomData);
    });
  });

  socket.on(events.reject, socketId => {
    ioEmitter.to(socketId).emit(events.reject);
  });

  socket.on(events.disconnect, async () => {
    console.log(`${socket.id} disconnected`);
    await disconnect(socket);
  });
};
