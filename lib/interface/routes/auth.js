'use strict';

const router = require('express').Router();
const loginController = require('../controllers/loginController');
const { isLoggedIn } = require('../middlewares/checkSessionMiddleware');
const recovPassword = require('../controllers/forgetpassController')

router.get('/', isLoggedIn, loginController.index);
router.post('/', isLoggedIn, loginController.attempLogin);
router.get('/signout', loginController.signOut);
router.post('/recovery_pass', recovPassword.sendEmail);
router.get('/change_pass/:key', recovPassword.changePassword);
router.put('/update_password', recovPassword.validateNewPassword);

module.exports = router;

