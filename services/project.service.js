const Project = require("../models/Project");

const getAllProjects = async () => {
    const allProjects = await Project.find();
    return {
        status: 200,
        message: "All projects found",
        projects: allProjects,
    };
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

const getProjectByTag = async (projectTag) => {
    const project = await Project.findOne({projectTag});
    //   check if project exists
    if (!project) {
        return {
            status: 404,
            message: "Project not found",
        };
    }
    return {
        status: 200,
        message: "Project Found",
        data: project
    };
}

const isProjectTagTaken = async (projectTag) => {
    await getProjectByTag(projectTag)
    if (res.error) {
        return false
    }
    return true
}

// Get all projects owned by a single user
const getProjectsByUser = (userID) => {
    // Fetch all projects by a single user
    const allProjects = Project.find(userID);
    return allProjects;
    
}
// --------------------------------------


// Create a new project
const createProject = async (details) => {
    const project = new Project(details);

    await project.save();
    
    return {
        status: 200,
        message: "Project created successfully",
        data: project,
    };
}

// Delete a single project 
const deleteProject = async (projectTag) => {
    const project = getProjectByTag(projectTag);
    if (project.status === 404) {
        return project;
    }
    await project.remove();

    return {
        status: 200,
        message: "Project deleted",
    }
}

// Add data to project
const addEntry = async (projectTag, data) => {
    const res = await getProjectByTag(projectTag);
    if (res.status === 404) {
        return project;
    }
    // Check entry details match the project storeSchema
    let project = res.data
    let rightLength = project.storeSchema.length;
    let length = new Set([...project.storeSchema, ...Object.keys(data)]);
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
    isProjectTagTaken,
}