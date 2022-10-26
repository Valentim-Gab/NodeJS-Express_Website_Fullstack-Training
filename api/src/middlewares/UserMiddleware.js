const validateBody = (req, res, next) => {
    const { body } = req

    if (body.nome === undefined) return retornoUserRes(`O campo nome é necessário!`)
    if (body.nome === '') return retornoUserRes(`O campo nome não pode ser vazio!`)
    if (body.idade === undefined) return retornoUserRes(`O campo idade é necessário!`)
    if (body.idade === '') return retornoUserRes('O campo idade não pode ser vazio')

    const retornoUserRes = (message) => {
        return res.status(400).json({ message })
    }

    next()
}

module.exports = {
    validateBody
}