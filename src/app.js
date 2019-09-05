'use strict';

const events = require('./events.js');
const read = require('./app/cache.js').read;
require('./logger.js');

let file = process.argv.slice(2).shift();
read(file);



