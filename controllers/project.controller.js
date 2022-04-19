const ProjectService = require('../services/project.service')

const getAllProjects = async (req, res) => {
    console.log("hit")
    let result = await ProjectService.getAllProjects()
    res.status(result.status).json(result)
}

const getProject = async (req, res) => {
    let { userID } = req.body
    let result = await ProjectService.getProject(userID)
    res.status(result.status).json(result)
}

const createProject = async (req, res) => {
    let { 
        collectionSchema,
        projectDesc,
        projectName,
        projectTag,
        projectType,
        userID,
      } = req.body
    


    // let result = await ProjectService.createProject(details)
    res.status(result.status).json(result)
}

const deleteProject = async (req, res) => {
    let { userID } = req.body
    // let result = await ProjectService.createProject(userID)
    res.status(result.status).json(result)
}

const addEntryToProject = async (req, res) => {
    let { userID, data } = req.body
    let result = await ProjectService.addEntry(userID, data)
    res.status(result.status).json(result)
}

const quickSave = async (req, res) => {
    // Get email from req.body
    let { email, data } = req.body
}

const ProjectController = {
    addEntryToProject,
    createProject,
    deleteProject,
    getAllProjects,
    getProject,
}


module.exports = ProjectController