'use strict';

var settings = require('./settings.json')
  , http = require('http')
  , connect = require('connect')
  , serveStatic = require('serve-static')
  , resolve = require('path').resolve

  , app = connect()
    .use(serveStatic(resolve(__dirname, 'public')))
    .use(serveStatic(resolve(__dirname, 'views')));

http.createServer(app).listen(settings.port || 8000);