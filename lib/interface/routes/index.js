'use strict';

const router = require('express').Router();
const checkSession = require('../middlewares/checkSessionMiddleware');
const auth = require('./auth');
const home = require('./home');
const user = require('./user');

router.use('/auth', auth);
router.use('/user', checkSession.isAuthenticated, user);
router.use('/', checkSession.isAuthenticated, home);

module.exports = router;