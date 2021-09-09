'use strict';

const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', userController.index);
router.post('/update', userController.update);
router.post('/', userController.createNew);
router.put('/:username/status/:status', userController.setStatus);
router.delete('/:username', userController.remove);
router.get('/:username', userController.find);

module.exports = router;