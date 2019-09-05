'use strict';
const socketIo = require('socket.io-client');

const API_URL = 'http://localhost:3000';

const server = socketIo.connect(`${API_URL}`);

const util = require('util');
const fs = require('fs');

const readFileAsync = util.promisify(fs.readFile);

server.emit('message', 'Connected at cache');

server.on('log', message => {
  console.log('cache', message);
});

server.on('saved', file => {
  console.log('file saved', file);
});

server.on('error', error => {
  console.log('file error:', error);
});

/**
 * @method read
 * @param file
 * @returns {Promise<void>}
 */
const read = async (file) => {
  let fileData = await readFileAsync(file, (err, data) => {
    if (err) {
      server.emit('file-error', {error: err});
    }
    return data;
  });
  //server.emit('upper-case', {file: file, data: fileData.toString()});
  upperCase({file: file, data: fileData.toString()});
};

/**
 * @method upperCase
 * @param object
 */
const upperCase = (object) => {
  let fileData = object.data;
  object.data = fileData.toUpperCase();
  //server.emit('write', object);
  write(object);
};

/**
 * @method write
 * @param object
 */
const write = (object) => {
  let file = object.file;
  let text = object.data;
  fs.writeFile( file, Buffer.from(text), (err, data) => {
    if (err) {
      server.emit('file-error', {error: err});
    }
    //server.emit('cache-update', { saved: file });
    server.emit('file-save', { saved: file });
  });
};

let file = process.argv.slice(2).shift();
read(file);