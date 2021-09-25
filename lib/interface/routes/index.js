'use strict';

const router = require('express').Router();
const checkSession = require('../middlewares/checkSessionMiddleware');
const auth = require('./auth');
const home = require('./home');
const user = require('./user');
const project = require('./project');
const issue = require('./issue');

router.use('/auth', auth);
router.use('/user', checkSession.isAuthenticated, user);
router.use('/project', checkSession.isAuthenticated, project);
router.use('/issue', checkSession.isAuthenticated, issue);
router.use('/', checkSession.isAuthenticated, home);

module.exports = router;