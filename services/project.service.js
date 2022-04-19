const Project = require("../models/Project");


const getAllProjects = async (req, res) => {
    const allProjects = await Project.find();
    res.status(200).json(allProjects);
}

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

// Delete a single project 
const deleteProject = (projectID) => {
    const project = getProject(projectID);
    if (project.status === 404) {
        return project;
    }
    return project.remove();
}

// Add data to project
const addEntry = (projectID, data) => {
    const project = getProject(projectID);
    if (project.status === 404) {
        return project;
    }
    project.collection = project.collection.push(data);
    return project.save();
}

const deleteEntry = (projectID, entryID) => {
    const project = getProject(projectID);
    if (project.status === 404) {
        return project;
    }
    project.collection = project.collection.filter(entry => entry._id !== entryID);
    return project.save();
}

module.exports = {
    addEntry,
    createProject,
    deleteProject,
    getAllProjects,
    getProject,
    getProjectsByUser,
}