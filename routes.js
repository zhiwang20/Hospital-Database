'use strict';

const path = require('path');
const passport = require('passport');
const AuthPath = require('./auth');
// import busboy from 'connect-busboy';

module.exports = function (app) {
    app.use('/auth', AuthPath);
    const requireAuth = passport.authenticate('jwt', {session: false});

    // app.route('/api')
    //     .get((req, res) => {
    //         res.json({ message: `Well you got your api` });
    //     })

    // // Main api routes
    // app.use('/api/beers', requireAuth, require('./api/beers'));
    // app.use('/api/users', require('./api/users'));
    // app.use('/api/applist', require('./api/applist'));
    app.use('/api/v1/users', require('./api/user'));
    app.use('/api/v1/beds', requireAuth, require('./api/bed'));
    app.use('/api/v1/departments', requireAuth, require('./api/department'));
    app.use('/api/v1/doctors', requireAuth, require('./api/doctor'));
    app.use('/api/v1/nurses', requireAuth, require('./api/nurse'));
    app.use('/api/v1/operations', requireAuth, require('./api/operation'));
    app.use('/api/v1/patients', requireAuth, require('./api/patient'));
    app.use('/api/v1/wards', requireAuth, require('./api/ward'));

    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get((req, res) => {
            res.status(400).send({
                message: `Route not found.`
            })
        });

    app.route('/*')
        .get((req, res) => {
            res.sendFile(path.join(__dirname, 'client/index.html'));
        })
}