const UserService = require('../services/user.service')

const getAllUsers = async (req, res) => {
    console.log("hit")
    let result = await UserService.getAllUsers()
    res.status(result.status).json(result)
}

const getUser = async (req, res) => {
    let { userID } = req.body
    let result = await UserService.getUser(userID)
    res.status(result.status).json(result)
}

const getUserByEmail = async (req, res) => {
    let { email } = req.body
    let result = await UserService.getUserByEmail(email)
    res.status(result.status).json(result)
}

const createUser = async (req, res) => {
    let { userName, email, password } = req.body

    let result = await UserService.createUser({userName, email, password})
    res.status(result.status).json(result.message)
}

const deleteUser = async (req, res) => {
    let { userID } = req.params
    let result = await UserService.deleteUser(userID)
    res.status(result.status).json(result.message)
}

const updateUserProjects = async (req, res) => {
    let { userID, data } = req.body
    let result = await UserService.updateUserProjects(userID, data)
    res.status(result.status).json(result)
}

const UserController = {
    createUser,
    deleteUser,
    getAllUsers,
    getUser,
    getUserByEmail,
    updateUserProjects
}


module.exports = UserController