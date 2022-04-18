const UserService = require('../services/user.service')

const getAllUsers = async (req, res) => {
    console.log("hit")
    let result = await UserService.getAllUsers()
    res.status(result.status).json(result)
}

module.exports = {
    getAllUsers
}