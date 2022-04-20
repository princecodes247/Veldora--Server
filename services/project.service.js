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
const addEntry = async (projectID, data) => {
    const project = getProject(projectID);
    if (project.status === 404) {
        return project;
    }
    // Check entry details match the project storeSchema
    let rightLength = storeSchema.length;
    let length = new Set([...storeSchema, ...Object.keys(data)]);
    if (length.size !== rightLength) {
        return {
            status: 400,
            message: "Entry details do not match the project storeSchema",
        };
    }
    project.store.push(data);
    await project.save();
    return {
        status: 200,
        message: "Entry added to project",
        store: project.store,
    };
}

const deleteEntry = async (projectID, entryID) => {
    const project = getProject(projectID);
    if (project.status === 404) {
        return project;
    }
    project.store = project.store.filter(entry => entry._id !== entryID);
    await project.save();
    return {
        status: 200,
        message: "Entry deleted from project",
        store: project.store,
    };
}

module.exports = {
    addEntry,
    createProject,
    deleteProject,
    getAllProjects,
    getProject,
    getProjectsByUser,
}