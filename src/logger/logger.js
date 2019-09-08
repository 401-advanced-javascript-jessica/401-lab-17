'use strict';

const socketIo = require('socket.io-client');

const API_URL = 'http://localhost:3000';

const server = socketIo.connect(`${API_URL}`);

server.emit('message', 'Connected at logger');

server.on('log', message => {
  console.log('logger', message);
});

server.on('file-save', payload => log('file-save', payload));
server.on('file-error', payload => log('file-error', payload));

function log(event, payload) {
  let time = new Date();
  console.log({ event, time, payload });
}