'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local');
const jwt = require('jsonwebtoken');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcrypt');
const fs = require('fs');
const { db } = require('../../config/db.connector');
const { raw } = require('express');
const SALT_FACTOR = 10;

process.env.PUBLIC_KEY_BUFFER = fs.readFileSync(process.env.PUBLIC_KEY);

const query_user = `SELECT * FROM users WHERE email = ?;`;
const query_user_id = `SELECT * FROM users WHERE id = ?;`;

const localAuthentication = async (email, password, done) => {
    const conn = db('main');
    let user;
    try {
        user = await conn.query(query_user, [email]);
        // console.log(user);
        if (!user || !user[0]) {
            return done(null, false, {message: 'Email not registered for login'});
        }
        user = user[0];
        console.log(user.password, password);
        if (user.kind && user.kind === 'origin' && user.password === password) {
            console.log(user);
            const hashed = await bcrypt.hash(password, SALT_FACTOR)
            const userUpd = await conn.query(`UPDATE users SET kind='masters', password = ? WHERE id = ?`, [hashed, user.id]);
            return done(null, user)
        }
        const matched = await bcrypt.compare(password, user.password.toString());
        if (!matched) {
            return done(null, false, {message: 'Password Didn\'t match'})
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}

const JwtAuth = async (payload, done) => {
    const conn = db('main');
    try {
        const user = await conn.query(query_user_id, [payload.id]);
        // console.log(user);
        if (!user || user.length < 1) {
            return done(null, false, {message: 'User not found'});
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}

function setup() {
    passport.use(new LocalStrategy({
        'usernameField': 'email',
        'passwordFiedl': 'password'
    }, (email, password, done) => {
        console.log(email, password);
        return localAuthentication(email, password, done);
    }));

    passport.use(new JwtStrategy({
        algorithms: ['RS256'],
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.PUBLIC_KEY_BUFFER,
    }, (payload, done) => {
        // console.log(payload);
        return JwtAuth(payload, done);
    }))
}

module.exports = {
    setup: setup
}