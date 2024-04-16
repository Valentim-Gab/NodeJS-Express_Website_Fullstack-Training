const app = require('./app')
const { connectDB } = require('./models/Connection')
require('dotenv').config()

const PORT = process.env.API_PORT || 3000

app.listen(PORT, () => console.log(`Server is running -> PORT: ${process.env.API_PORT}`))

