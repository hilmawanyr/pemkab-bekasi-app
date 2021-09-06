'use strict';

const session = require('express-session');
const { redisClient } = require('./sessionStore');
const SessionStore = require('connect-redis')(session);
const config = require('../config/constants');

module.exports = (req, res, next) => {
    session({
        secret: config.SESSION.key,
        store: new SessionStore({ client: redisClient }),
        cookie: {
            secure: config.ENV === 'production' ? true : false,
            maxAge: 7200000
        },
        resave: false,
        saveUninitialized: true,
        rolling: true,
    });
    next();
}