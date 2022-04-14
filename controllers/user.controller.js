const User = require("../models/User");

// ------ Fetch Controllers -------------
// Get a single user from the database
const getUser = (userID) => {
  
}

// Get all users owned by a single user
const getAllUsers = () => {
    // Fetch all users
    // .find()
}
// --------------------------------------


// Create a new user
const createUser = (details) => {
    
}

// Add data to user
const updateUserProjects = (userID, data) => {
    // let 
}

// Delete a single user 
const deleteUser = (userID) => {

}

AuthController = {
    createUser,
    deleteUser,
    getAllUsers,
    getUser,
    updateUserProjects
}

module.exports = AuthController