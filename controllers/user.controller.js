const UserService = require('../services/user.service')

const getAllUsers = async (req, res) => {
    let result = await UserService.getAllUsers()
    res.status(result.status).json(result)
}

module.exports = {
    getAllUsers
}