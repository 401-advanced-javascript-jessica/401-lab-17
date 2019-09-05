'use strict';

const events = require('./events.js');
const util = require('util');
const fs = require('fs');

const readFileAsync = util.promisify(fs.readFile);

/**
 * @method read
 * @param file
 * @returns {Promise<void>}
 */
const read = async (file) => {
  let fileData = await readFileAsync(file, (err, data) => {
    if (err) {throw err;}
    return data;
  });
  events.emit('upper-case', {file: file, data: fileData.toString()});

};

/**
 * @method upperCase
 * @param object
 */
const upperCase = (object) => {
  let fileData = object.data;
  object.data = fileData.toUpperCase();
  events.emit('write', object);
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
      throw err;
    }
    events.emit('cache-update', { saved: file });
  });
};

events.on('read', read);
events.on('upper-case', upperCase);
events.on('write', write);

module.exports = {
  read: read,
};