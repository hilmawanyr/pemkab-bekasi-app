'use strict';

const router = require('express').Router();
const loginController = require('../controllers/loginController');
const { isLoggedIn } = require('../middlewares/checkSessionMiddleware');

router.get('/', isLoggedIn, loginController.index);
router.post('/', isLoggedIn, loginController.attempLogin);
router.get('/signout', loginController.signOut);

module.exports = router;

