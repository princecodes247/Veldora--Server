const express = require('express');
const router = express.Router();
const ProjectController = require("../controllers/project.controller")
const {canWriteToProject, canReadProject} = require("../middlewares/project.middleware")

router.get('/getAllProjects', canReadProject, ProjectController.getAllProjects);
router.get('/getProject/:projectID', canReadProject, ProjectController.getProject);
router.get('/createProject', ProjectController.createProject);
router.get('/deleteProject', canWriteToProject, ProjectController.deleteProject);
router.get('/add', ProjectController.addEntryToProject);
// router.get('/:projectTag/add',   ProjectController.addEntryToProject);
// router.get('/id/:projectID/add',   ProjectController.addEntryToProject);

module.exports = router;
