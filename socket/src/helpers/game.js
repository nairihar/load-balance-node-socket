import { RedisClient } from '../db';

export const createPlayer = async (socketId, playerData) => {
  await RedisClient.setAsync(socketId, JSON.stringify(playerData));
};

export const getRoom = async roomId => {
  const roomData = await RedisClient.getAsync(roomId);
  const roomDataParsed = JSON.parse(roomData);
  return roomDataParsed;
};

export const saveRoom = async (roomId, roomData) => {
  await RedisClient.setAsync(roomId, JSON.stringify(roomData));
};

export const getPlayer = async socketId => {
  const playerData = await RedisClient.getAsync(socketId);
  const playerDataParsed = JSON.parse(playerData);
  return playerDataParsed;
};

export const playerJoinRoom = async (socketId, roomId) => {
  const userData = await RedisClient.getAsync(socketId);
  if (!userData) {
    return console.log('Error: player not found in redis');
  }
  const userDataParsed = JSON.parse(userData);

  const newUserData = {
    ...userDataParsed,
    roomId
  };
  await RedisClient.setAsync(socketId, JSON.stringify(newUserData));
};
