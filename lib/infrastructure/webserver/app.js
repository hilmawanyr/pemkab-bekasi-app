'use strict';

const express = require('express');
const app = express();
const path = require('path');
const routes = require('../../interface/routes/index');
const session = require('express-session');
const helmet = require('helmet');
const { redisClient } = require('../session/sessionStore');
const SessionStore = require('connect-redis')(session);
const config = require('../config/constants');
const logger = require('../logger/winston');

app.set('view engine', 'ejs');
app.use('/bootstrap', express.static( path.join(__dirname, '../../../assets/bootstrap') ));
app.use('/custom', express.static( path.join(__dirname, '../../../assets/custom') ));
app.use('/leaflet', express.static( path.join(__dirname, '../../../assets/leaflet') ));
app.use('/upload', express.static( path.join(__dirname, '../../../upload') ));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(
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
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(routes);
app.all('/upload*', (req,res, next) => {
    res.status(403).json({
       message: 'Access Forbidden'
    });
});
app.use(function (err, req, res, next) {
    logger.error(err);
    res.render('pages/err500', {
        pageTitle: 'Error',
        pageName: 'Error'
    });
});

module.exports = app;