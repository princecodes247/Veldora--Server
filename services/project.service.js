const Project = require("../models/Project");

const getAllProjects = async () => {
  try {
    const allProjects = await Project.find();
    if (allProjects.length === 0)
      return { status: 404, message: "No projects found", data: allProjects };

    return {
      status: 200,
      message: "Projects found",
      data: allProjects,
    };
  } catch (error) {
    return {
      status: 500,
      message: "An error occured",
      data: error,
    };
  }
};
// status: 200,
// message: "All projects found",

// Get a single project from the database
const getProject = (projectTag) => {
  try {
    const project = Project.findById(projectTag);
    //   check if project exists
    if (!project) {
      return {
        status: 404,
        message: "No project found",
        data: null,
      };
    }
    return {
      status: 200,
      message: "Project found",
      data: project,
    };
  } catch (error) {
    return {
      status: 500,
      message: "An error occured",
      data: error,
    };
  }
};
// status: 404,
//             message: "Project not found",

const getProjectByTag = async (projectTag) => {
  try {
    const project = await Project.findOne({ projectTag });
    //   check if project exists
    if (!project) {
      return {
        status: 404,
        message: "No project found",
        data: null,
      };
    }
    return {
      status: 200,
      message: "Project found",
      data: project,
    };
  } catch (error) {
    return {
      status: 500,
      message: "An error occured",
      data: error,
    };
  }
};
// status: 404,
//             message: "Project not found",

// status: 200,
//         message: "Project Found",

const isProjectTagTaken = async (projectTag, username) => {
  try {
    let project = await Project.findOne({ projectTag, username });
    if (!project)
      return { status: 404, message: "Tag is available", data: false };

    return { status: 200, message: "Tag is already in use", data: true };
  } catch (error) {
    return {
      status: 500,
      message: "An error occured",
      data: error,
    };
  }
};

// Get all projects owned by a single user
const getProjectsByUser = (userID) => {
  try {
    // Fetch all projects by a single user
    const result = Project.find({ userID });

    if (result.length === 0)
      return { status: 404, message: "No projects found", data: result };

    return {
      status: 200,
      message: "Project found",
      data: result,
    };
  } catch (error) {
    return {
      status: 500,
      message: "An error occured",
      data: error,
    };
  }
};
// --------------------------------------

// Create a new project
const createProject = async (details) => {
  try {
    const project = new Project(details);

    await project.save();

    return {
      status: 200,
      message: "Project saved successfully",
      data: project,
    };
  } catch (error) {
    return {
      status: 500,
      message: "An error occured",
      data: error,
    };
  }
};
// status: 200,
// message: "Project created successfully",

// Delete a single project
const deleteProject = async (projectTag) => {
  const project = getProjectByTag(projectTag);
  if (!project.status === 200) return project;

  await project.remove();

  return {
    error: false,
    message: "Project deleted",
  };
};

// Add data to project
const addEntry = async (projectTag, data) => {
  const res = await getProjectByTag(projectTag);
  if (res.status === 404) return project;
  
  // Check entry details match the project storeSchema
  let project = res.data;
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
};

const deleteEntry = async (projectID, entryID) => {
  const project = getProject(projectID);
  if (project.status === 404) {
    return project;
  }
  project.store = project.store.filter((entry) => entry._id !== entryID);
  await project.save();
  return {
    status: 200,
    message: "Entry deleted from project",
    store: project.store,
  };
};

module.exports = {
  addEntry,
  createProject,
  deleteProject,
  getAllProjects,
  getProject,
  getProjectsByUser,
  isProjectTagTaken,
};
