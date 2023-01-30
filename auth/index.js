'use strict';

const express = require('express');

const router = express.Router();

require('./local/passport').setup();

router.use('/login', require('./local'));

module.exports = router;