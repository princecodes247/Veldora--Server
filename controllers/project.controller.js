const Project = require("../models/Project");

// ------ Fetch Controllers -------------
// Get a single project from the database
const getProject = (projectTag) => {
    let project = Project.findOne(projectTag).then(
        res => {
            return res
        }).catch(err => console.log(err))
}

// Get all projects owned by a single user
const getProjectsByUser = (userID) => {
    // Fetch all projects by a single user
    let projects = Project.find(userID)
    
}
// --------------------------------------


// Create a new project
const createProject = (details) => {
    let newProject = {

    }
    // Project
}

// Add data to project
const saveToProject = (projectID, data) => {
    // let 
}

// Delete a single project 
const deleteProject = (projectID) => {

}

module.exports = {
    createProject,
    deleteProject,
    getProject,
    getProjectsByUser,
    saveToProject
}