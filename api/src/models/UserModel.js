const connection = require('./Connection')

const getOne = async (id) => {
    const [user] = await connection.execute('SELECT * FROM user WHERE id = ?', [id]);

    return user
}

const getAll = async () => {
    const [users] = await connection.execute('SELECT * FROM user');

    return users
}

const addUser = async (user) => {
    const { nome, idade } = user
    const [addedUser] = await connection.execute(
        `INSERT INTO user (nome, idade) VALUES (?, ?);`, [nome, idade]
    );

    return { insertId: addedUser.insertId }
}

const deleteUser = async (id) => {
    const [deletedUser] = await connection.execute(`DELETE FROM user WHERE id = ?;`, [id]);

    return deletedUser
}

const updateUser = async (id, user) => {
    const { nome, idade } = user
    const [updatedUser] = await connection.execute(
        `UPDATE user SET nome = ?, idade = ? WHERE id = ?;`, [nome, idade, id]
    );

    return updatedUser
}

module.exports = {
    getAll,
    addUser,
    deleteUser,
    updateUser,
    getOne
}