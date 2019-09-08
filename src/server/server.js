'use strict';

const socketIoServer = require('socket.io')(3000);

socketIoServer.on('connection', socket => {
  console.log('Connected', socket.id);

  socket.on('message', message => {
    console.log('Processing Message');
    console.log(message);
    socket.broadcast.emit('log', message);
  });

  socket.on('file-save', object => {
    console.log('File has been saved');
    console.log(object);
    socket.broadcast.emit('file-save', object.saved);
  });

  socket.on('file-error', error => {
    socket.broadcast.emit('file-error', error);
  });

});

console.log('Server is up on port 3000');