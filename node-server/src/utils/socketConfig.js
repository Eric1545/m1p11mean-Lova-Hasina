// socketUtils.js
const socket = require('socket.io');

let ioInstance;

function initializeSocket(server) {
  ioInstance = socket(server);

  ioInstance.on('connection', (socket) => {
    console.log(`New connection ${socket.id}`);
  });

  return ioInstance;
}

function emitChat(data) {
  if (ioInstance) {
    ioInstance.sockets.emit('chat', data);
  }
}

function emitTyping(data) {
  if (ioInstance) {
    ioInstance.sockets.emit('typing', data);
  }
}

module.exports = { initializeSocket, emitChat, emitTyping };
