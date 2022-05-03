const UserService = require("../services/user.service");


const createUser = async (req, res) => {
  let { username, email, password } = req.body;
  password = password.trim()
  username = username.trim()
  email = email.trim()
  // Check
  if (!username || !email || !password) {
    return res.status(400).json({
      status: 400,
      message: "Please provide all required fields",
    });
  }
  let result = await UserService.createUser({ username, email, password });
  res.status(result.status).json(result);
};

const deleteUser = async (req, res) => {
  let { userID } = req.params;
  let result = await UserService.deleteUser(userID);
  res.status(result.status).json(result);
};

const getAllUsers = async (req, res) => {
  console.log("hit");
  let result = await UserService.getAllUsers();
  res.status(result.status).json(result);
};

const getUser = async (req, res) => {
  const { userID } = req.params;
  const result = await UserService.getUser(userID);
  res.status(result.status).json(result);
};

const getUserByEmail = async (req, res) => {
  const { email } = req.body;
  const result = await UserService.getUserByEmail(email);
  res.status(result.status).json(result);
};

const updateUserLevel = async (req, res) => {
  const { userID } = req.params;
  const { level } = req.query
  await UserService.getUser(userID)
    .then(result => {
      return result.data
    })
    .then(async user => {
      user.level = level
      await user.save().then(() => {
        console.log(`User Level updated to ${level}`)
      })
    })
}

const UserController = {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  getUserByEmail,
  updateUserLevel
};

module.exports = UserController;
