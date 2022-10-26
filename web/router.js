const express = require('express')
const router = express.Router()
const routerIndex = require('./routes/indexRouter')
const routerCSS = require('./routes/cssRouter')
const routerJS = require('./routes/jsRouter')
const routerIMG = require('./routes/imgRouter')

router.use(routerCSS)
router.use(routerJS)
router.use(routerIMG)
router.use(routerIndex)

module.exports = router