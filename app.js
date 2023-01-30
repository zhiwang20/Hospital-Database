'use strict';

const express = require('express');
const http = require('http');
const config = require('./config/environment');
const app = express();
app.set('config', config);
app.set('env', process.env.NODE_ENV);

const {init} = require('./config/db.connector');
init();
const server = http.createServer(app);
require('./config/express').default(app);

// require('./config/express').default(app);
require('./routes')(app);

const startServer = () => {
    app.angularFullstack = server.listen(config.port, config.ip, () => {
        console.log(`Express server listening on ${config.port}, ${app.get('env')} in  mode`);
    });
}

setImmediate(startServer);

module.exports = app;