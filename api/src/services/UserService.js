const userModel = require('../models/UserModel.js')

const getUserOne = async (id) => {
    const user = await userModel.getOne(id)
    return user
}

const getUsersAll = async () => {
    const users = await userModel.getAll()
    return users
}

const addUser = async (task) => {
    const addedUser = await userModel.addUser(task)
    return addedUser
}

const deleteUser = async (id) => {
    const deletedUser = await userModel.deleteUser(id)
    return deletedUser
}

const updateUser = async (id, user) => {
    const updatedUser = await userModel.updateUser(id, user)
    return updatedUser
}

module.exports = {
    getUsersAll,
    addUser,
    deleteUser,
    updateUser,
    getUserOne
}