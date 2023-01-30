'use strict';

const express = require('express');
const passport = require('passport');
const { signToken } = require('../auth.service');

const router = express.Router();

router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        const error = err || info;
        if (error) {
            console.error(error);
            return res.status(401).json(error);
        }
        if (!user) {
            return res.status(404).json({message: `User not found`});
        }
        const { email, id, kind } = user;
        const query = req.body;
        const token = query.expiresIn ? signToken({email, id, kind}, query.expiresIn) : signToken({email, id, kind});
        console.log(token);
        return res.json({ token });
    })(req, res, next);
});

module.exports = router;