const express = require('express')
const router = express.Router()
const routerUser = require('./controllers/UserController')

router.use(routerUser)

module.exports = router