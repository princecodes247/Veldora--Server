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
    const res = await getUser(userID);
    if (res.status === 404) return res;

    res.data.projects = data;
    let user = res.data
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
      data: error
    };
  }
};

// Delete a single user
const deleteUser = async (userID) => {
  try {
    const user = await User.deleteOne({_id: userID});
    console.log(user)
    return {
      status: 200,
      error: false,
      message: "User deleted",
      count: user.deletedCount
    };
  } catch (error) {
    return {
      status: 500,
      error: true,
      message: "Internal server error",
      details: error
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


// TODO: Implement the following functions:
// skip and limit on all projects function