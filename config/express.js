'use strict';

const defaultFunc =  (app) => {
    const express = require('express');
    const path = require('path');
    const morgan = require('morgan');
    const helmet = require('helmet');
    const bodyParser = require('body-parser');
    const cors = require('cors');

    app.disable('etag');
    app.disable('x-powered-by');

    const env = app.get('env');

    morgan.token('customdate', (req, res) => {
        let date = new Date();
        let opts = {
            hour12: false,
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        };
        return `<| ${date.toLocaleDateString('en-US', opts)} |>`;
    });

    if (env === 'development' || env === 'test') {
        app.use(morgan('tiny'));
    } else if (env ==='production') {
        app.use(morgan(':customdate :method :url :status :res[content-length] - :response-time ms', {
            skip: function (req, res) {
                if (req.baseUrl && /api/ig.test(req.baseUrl)) return false;
                else if (req.statusCode < 400) return true;
                else return false;
            }
        }));
    }

    app.set('appPath', path.join(__dirname, '../client'));
    console.log(app.get('appPath'));
    app.use(express.static(app.get('appPath')));

    app.use(helmet());
    // app.set('serverPath', path.join(config.root, 'server'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
        next();
    });

    const whitelist = [
        'http://localhost:6300',
        'http://localhost:8080',
    ];
    const corsoptions = {
        origin: (origin, cb) => {
            if (!origin) {
                cb(null, true);
            }else if (whitelist.indexOf(origin) !== -1) {
                cb(null, true);
            } else {
                cb(new Error('Not allowed by CORS'));
            }
        }
    }
    app.use(cors(corsoptions));
}

module.exports = {
    default: defaultFunc
}
