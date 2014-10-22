'use strict';

var colors = require('colors');

try {
  require.resolve('node-windows');
} catch(e) {
  console.log('"node-windows" is not installed. Try running "npm install -g node-windows && npm link node-windows".'.red);
  process.exit(e.code);
}

var settings = require('./settings.json')
  , nodeWindows = require('node-windows')
  , Service = nodeWindows.Service
  , EventLogger = nodeWindows.EventLogger

  , alreadyInstalled = false
  , log = new EventLogger(settings.service.name)
  , server = new Service({
    name: settings.service.name,
    description: settings.service.description,
    script: settings.serverPath
  });

server.user.domain = settings.service.domain || server.user.domain;
server.user.account = settings.service.account || server.user.account;
server.user.password = settings.service.password || server.user.password;

server.on('install', function() {
  console.log('starting service'.green);
  server.start();
});

server.on('alreadyinstalled', function() {
  alreadyInstalled = true;

  console.log('service already installed: '.yellow + 'uninstalling old version'.italic.grey);
  server.uninstall();
});

server.on('uninstall', function() {
  if(!alreadyInstalled) { return; }

  console.log('reinstalling service'.green);
  server.install();
});

server.on('error', function(err) {
  log.error(err.red);
});

console.log('installing service'.green);
server.install();