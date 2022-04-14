const User = require("../models/User");



// Get a single user from the database
const getUser = (userID) => {
  const user = User.findById(userID);
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
const getUserByEmail = (email) => {
    const user = User.findOne({ email });
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
  const allUsers = await User.find();
  return allUsers;
};

// Create a new user
const createUser = (details) => {
    const user = new User(details);
    return user.save();
};

// Add data to user
const updateUserProjects = (userID, data) => {
    const user = getUser(userID);
    if (user.status === 404) {
        return user;
    }
    user.projects = data;
    return user.save();
};

// Delete a single user
const deleteUser = (userID) => {
    const user = getUser(userID);
    if (user.status === 404) {
        return user;
    }
    return user.remove();
};

const UserController = {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUserProjects,
};

module.exports = UserController;
