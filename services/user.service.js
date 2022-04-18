const User = require("../models/User");

// Get a single user from the database
const getUser = async (userID) => {
  try {
    const user = await User.findById(userID);
    //   check if user exists
    if (!user) {
      return {
        status: 404,
        message: "User not found",
      };
    }
    return {
      status: 200,
      error: false,
      message: "User found",
      data: user,
    };
  } catch (error) {
    return {
      status: 500,
      error: true,
      message: "Internal server error",
    };
  }
};

// Get a single user from the database by email
const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    //   check if user exists
    if (!user) {
      return {
        status: 404,
        message: "User not found",
        error: true,
      };
    }
    return {
      status: 200,
      error: false,
      message: "User found",
      data: user,
    };
  } catch (error) {
    return {
      status: 500,
      error: true,
      message: "Internal server error",
    };
  }
};

// Get all users owned by a single user
const getAllUsers = async () => {
  // Fetch all users
    const allUsers = await User.find().catch(error => {
      return {
        status: 500,
        error: true,
        message: "Internal server error",
      }
    })
    let total = await User.countDocuments();
    return {
      status: 200,
      error: false,
      message: "Success",
      data: {
        total,
        users: allUsers,
      },
    }; 
};

// Create a new user
const createUser = async (details) => {
  try {
    const user = new User(details);
    await user.save();

    return {
      status: 200,
      error: false,
      message: "User created",
      data: user,
    };
  } catch (error) {
    return {
      status: 500,
      error: true,
      message: "Internal server error",
    };
  }
};

// Add data to user
const updateUserProjects = async (userID, data) => {
  try {
    const user = await getUser(userID);
    if (user.status === 404) return user;

    user.projects = data;
    await user.save();

    return {
      status: 200,
      error: false,
      message: "User projects updated",
    };
  } catch (error) {
    return {
      status: 500,
      error: true,
      message: "Internal server error",
    };
  }
};

// Delete a single user
const deleteUser = async (userID) => {
  try {
    const user = await getUser(userID);
    if (user.status === 404) {
      return user;
    }
    await user.remove();
    return {
      status: 200,
      error: false,
      message: "User deleted",
    };
  } catch (error) {
    return {
      status: 500,
      error: true,
      message: "Internal server error",
    };
  }
};

const UserService = {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUserProjects,
};

module.exports = UserService;
