const express = require('express')
const router = express.Router()
const userService = require('../services/UserService.js')
const userMiddleware = require('../middlewares/UserMiddleware.js')
const diretorio = 'user'

router.get(`/${diretorio}/getOne/:id`, async (req, res) => {
    const { id } = req.params
    return res.status(200).json(await userService.getUserOne(id))
})

router.get(`/${diretorio}/getAll`, async (req, res) => {
    return res.status(200).json(await userService.getUsersAll())
})

router.get(`/${diretorio}/search/:input`, async (req, res) => {
    const { input } = req.params

    return res.status(200).json(await userService.search(input))
})

router.post(`/${diretorio}/add`, userMiddleware.validateBody, async (req, res) => {
    const addedUser = await userService.addUser(req.body)

    return res.status(201).json(addedUser)
})

router.delete(`/${diretorio}/del/:id`, async (req, res) => {
    const { id } = req.params
    await userService.deleteUser(id)

    return res.status(204).json()
})

router.put(`/${diretorio}/upd/:id`, userMiddleware.validateBody, async (req, res) => {
    const { id } = req.params
    await userService.updateUser(id, req.body)

    return res.status(204).json()
})

module.exports = router;