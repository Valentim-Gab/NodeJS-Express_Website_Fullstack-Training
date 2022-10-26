const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/css/:file', async (req, res) => {
    res.sendFile(path.join(__dirname + `/../view/css/${req.params.file}`))
})

module.exports = router