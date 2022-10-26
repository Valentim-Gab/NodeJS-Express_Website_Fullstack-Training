const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/js/:file', async (req, res) => {
    res.sendFile(path.join(__dirname + `/../view/js/${req.params.file}`))
})

module.exports = router