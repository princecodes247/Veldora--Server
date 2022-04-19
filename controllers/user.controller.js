const UserService = require('../services/user.service')

const getAllUsers = async (req, res) => {
    console.log("hit")
    let result = await UserService.getAllUsers()
    res.status(result.status).json(result)
}

const getUser = async (req, res) => {
    let { userID } = req.body
    let result = await UserService.getUser()
    res.status(result.status).json(result)
}

const createUser = async (req, res) => {

}

const UserController = {
    getAllUsers,
    getUser
}


module.exports = UserController