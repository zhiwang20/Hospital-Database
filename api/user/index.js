'use strict';

const express = require('express');
const passport = require('passport');

const user = require('./user.controller');

const router = express.Router();
const requireAuth = passport.authenticate('jwt', {session: false});

router.get('/', requireAuth, user.index);
router.get('/me', requireAuth, user.me);
router.post('/', requireAuth, user.create);

module.exports = router;