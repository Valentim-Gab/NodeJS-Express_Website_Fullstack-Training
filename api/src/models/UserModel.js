const { client, connectDB } = require('./Connection')

const getOne = async (id) => {
  try {
    const res = await client.query('SELECT * FROM users WHERE id = $1', [id])
    return res.rows[0]
  } catch (err) {
    console.error('Erro ao obter usuário:', err)
    return null
  }
}

const getAll = async () => {
  try {
    const res = await client.query('SELECT * FROM users WHERE active = true')
    return res.rows
  } catch (err) {
    console.error('Erro ao obter todos os usuários:', err)
    return []
  }
}

// safasf' or '1' = '1' --
// adm' UNION ALL SELECT senha as nome, idade FROM users --
const search = async (input) => {
  try {
    console.log(`SELECT nome, idade FROM users WHERE active = true AND nome LIKE '%${input}%'`)

    const res = await client.query(`SELECT nome, idade FROM users WHERE active = true AND nome LIKE '%${input}%'`)
    return res.rows
  } catch (err) {
    console.error('Erro ao obter todos os usuários:', err)
    return []
  }
}

const addUser = async (user) => {
  const { nome, idade } = user
  try {
    const res = await client.query(
      'INSERT INTO users (nome, idade) VALUES ($1, $2) RETURNING id',
      [nome, idade]
    )
    return res.rows[0].id
  } catch (err) {
    console.error('Erro ao adicionar usuário:', err)
    return null
  }
}

const deleteUser = async (id) => {
  try {
    await client.query('DELETE FROM users WHERE id = $1', [id])
    return true
  } catch (err) {
    console.error('Erro ao excluir usuário:', err)
    return false
  }
}

const updateUser = async (id, user) => {
  const { nome, idade } = user
  try {
    await client.query('UPDATE users SET nome = $1, idade = $2 WHERE id = $3', [
      nome,
      idade,
      id,
    ])
    return true
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err)
    return false
  }
}

module.exports = {
  getAll,
  addUser,
  deleteUser,
  updateUser,
  getOne,
  search
}
