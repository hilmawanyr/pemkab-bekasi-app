'use strict';

const router = require('express').Router();
const loginController = require('../controllers/loginController');

router.get('/', loginController.index);

module.exports = router;

