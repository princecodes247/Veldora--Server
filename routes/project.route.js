const express = require('express');
const router = express.Router();
const ProjectController = require("../controllers/project.controller")

router.get('/getAllProjects', ProjectController.getAllProjects);
router.get('/getProject/:projectID', ProjectController.getProject);
router.get('/createProject',   ProjectController.createProject);
router.get('/deleteProject',   ProjectController.deleteProject);
router.get('/add',   ProjectController.addEntryToProject);
// router.get('/:projectTag/add',   ProjectController.addEntryToProject);
// router.get('/id/:projectID/add',   ProjectController.addEntryToProject);

module.exports = router;
