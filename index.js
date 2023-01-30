'use strict';

const path = require('path');
const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// require('dotenv').config();

process.env.PRIVATE_KEY = path.join(__dirname, 'config/keys/test-key');
process.env.PUBLIC_KEY = path.join(__dirname, 'config/keys/test-key.pem');

require('./app');