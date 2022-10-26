const app = require('./app')
require('dotenv').config()

const PORT = process.env.BASE_PORT || 8080

app.listen(PORT, () => console.log(`Server is running -> PORT: ${process.env.BASE_PORT}`))