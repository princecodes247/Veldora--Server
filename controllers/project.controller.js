const ProjectService = require('../services/project.service')
const { getUser, updateUserProjects } = require('../services/user.service')

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
        storeSchema,
        projectDesc,
        projectName,
        projectTag,
        projectType,
        userID,
      } = req.body
      
    //   Check
    if (!storeSchema || !projectDesc || !projectName || !projectTag || !projectType || !userID) {
        return res.status(400).json({
            status: 400,
            message: "Please provide all required fields",
        });
    }

    // Trim inputs
    // storeSchema = storeSchema.trim()
    projectDesc = projectDesc.trim()
    projectName = projectName.trim()
    projectTag = projectTag.trim()
    // projectType = projectType.trim()
    userID = userID.trim()


    let owner = await getUser(userID);
    if (owner.status === 404) {
        return {
            status: 404,
            message: "User not found",
        };
    }

    let result = await ProjectService.createProject({
        storeSchema,
        projectDesc,
        projectName,
        projectTag,
        projectType,
        ownerID: userID,
    })
    await updateUserProjects(userID, [...owner.data.projects, result.projectTag])
    res.status(result.status).json(result)
}

const deleteProject = async (req, res) => {
    let { userID } = req.body
    let result = await ProjectService.createProject(userID)
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