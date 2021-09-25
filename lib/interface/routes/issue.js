'use strict';

const router = require('express').Router();
const { showAll, getDetail } = require('../controllers/issueController');

router.get('/:id', showAll);
router.get('/:id/detail', getDetail);

module.exports = router;