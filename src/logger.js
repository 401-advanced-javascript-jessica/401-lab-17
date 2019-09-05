'use strict';

const events = require('./events');

events.on('read', payload => log('read', payload));
events.on('upper-case', payload => log('upper-case', payload));
events.on('write', payload => log('write', payload));
events.on('cache-update', payload => log('cache-update', payload));

//events.on('cache-update', payload => log('cache-update', payload));

/**
 * @method log
 * @param event
 * @param payload
 */
function log(event, payload) {
  let time = new Date();
  console.log({ event, time, payload });
}