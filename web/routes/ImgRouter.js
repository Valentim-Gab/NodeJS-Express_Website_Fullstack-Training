const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/favicon', async (req, res) => {
    res.sendFile(path.join(__dirname + `/../view/img/planejador.ico`))
})

module.exports = router