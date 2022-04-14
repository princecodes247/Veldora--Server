const Project = require("../models/Project");

// ------ Fetch Controllers -------------
// Get a single project from the database
const getProject = (projectTag) => {
    const project = Project.findById(projectTag);
    //   check if project exists
    if (!project) {
        return {
            status: 404,
            message: "Project not found",
        };
    }
    return project;
}

const getProjectByTag = (projectTag) => {
    const project = Project.find(projectTag);
    //   check if project exists
    if (!project) {
        return {
            status: 404,
            message: "Project not found",
        };
    }
    return project;
}

// Get all projects owned by a single user
const getProjectsByUser = (userID) => {
    // Fetch all projects by a single user
    const allProjects = Project.find(userID);
    return allProjects;
    
}
// --------------------------------------


// Create a new project
const createProject = (details) => {
    const project = new Project(details);
    return project.save();
}

// Add data to project
const saveToProject = (projectID, data) => {
    const project = getProject(projectID);
    if (project.status === 404) {
        return project;
    }
    project.data = data;
    return project.save();
}

// Delete a single project 
const deleteProject = (projectID) => {
    const project = getProject(projectID);
    if (project.status === 404) {
        return project;
    }
    return project.remove();
}

module.exports = {
    createProject,
    deleteProject,
    getProject,
    getProjectsByUser,
    saveToProject
}