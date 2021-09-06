'use strict';

const router = require('express').Router();
const checkSession = require('../middlewares/checkSessionMiddleware');
const auth = require('./auth');
const home = require('./home');

router.use('/auth', auth);
router.use('/', checkSession.isAuthenticated, home);

module.exports = router;