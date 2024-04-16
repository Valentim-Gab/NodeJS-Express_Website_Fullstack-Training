// const mysql = require('postgres/promise')
// require('dotenv').config()

// const connection = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DB
// })

// module.exports = connection

const { Client } = require('pg')
require('dotenv').config()

const client = new Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
})

const connectDB = async () => {
  try {
    await client.connect()
    console.log('Conectado ao PostgreSQL')
  } catch (err) {
    console.error('Erro de conexão:', err)
  }
}

connectDB()

module.exports = {
  client,
  connectDB,
}
