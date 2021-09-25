'use strict';

const router = require('express').Router();
const { showAll, create, showDetail, updateProjectName, updateProjectDescription, deleteProject, assignUser, dischargesUserFromProject, pic } = require('../controllers/projectController');

router.get('/', showAll);
router.post('/', create);
router.get('/:id', showDetail);
router.put('/name', updateProjectName);
router.put('/description', updateProjectDescription);
router.delete('/', deleteProject);
router.post('/assign_user', assignUser);
router.put('/discharge_user', dischargesUserFromProject);
router.get('/:projectid/pic', pic);

module.exports = router;