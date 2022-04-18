const User = require("../models/User");

// Get a single user from the database
const getUser = async (userID) => {
  const user = await User.findById(userID);
  //   check if user exists
  if (!user) {
    return {
      status: 404,
      message: "User not found",
    };
  }
  return user;
};

// Get a single user from the database by email
const getUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    //   check if user exists
    if (!user) {
      return {
        status: 404,
        message: "User not found",
      };
    }
    return user;
  };

// Get all users owned by a single user
const getAllUsers = async () => {
  // Fetch all users
  try {
    const allUsers = await User.find();
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
  } catch (error) {
    return {
      status: 500,
      error: true,
      message: "Internal server error",
    };
  }
};

// Create a new user
const createUser = async (details) => {
    const user = new User(details);
    return await user.save();
};

// Add data to user
const updateUserProjects = async (userID, data) => {
    const user = await getUser(userID);
    if (user.status === 404) {
        return user;
    }
    user.projects = data;
    return await user.save();
};

// Delete a single user
const deleteUser = async (userID) => {
    const user = await getUser(userID);
    if (user.status === 404) {
        return user;
    }
    return await user.remove();
};

const UserService = {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUserProjects,
};

module.exports = UserService;
