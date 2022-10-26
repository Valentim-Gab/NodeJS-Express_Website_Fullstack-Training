const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs').promises
const dirPages = path.join(__dirname + `./../view/pages`)

const sendHtml = async (res, page) => {
    return (
        res.status(200).sendFile(path.join(
            `${page}`
        ))
    )
}

const listDirPages = async (dir, pages) => {
    if (!pages)
        pages = [];

    const listPages = await fs.readdir(dir)

    for (let i in listPages) {
        const stat = await fs.stat(dir + '/' + listPages[i])

        if (stat.isDirectory())
            await listDirPages(dir + '/' + listPages[i], pages)

        const html = listPages[i].split('/').pop()

        if (html == 'index.html') {
            pages.push((dir + '/' + listPages[i]).split("pages")[1])
        }
    }

    return pages
}

const callListDirPages = async () => {
    const routes = await listDirPages(dirPages)

    routes.forEach(element => {
        let link = element.replace('/index.html', '')

        link.split('/').forEach(router => {
            const match = router.match(/\[(\w+?)\]/)
            if (match !== null) {
                const param = match[1]
                link = link.replace(`/[${param}]`, `/:${param}`)
            }
        })

        if (element == '/home/index.html') {
            router.get('/', (req, res) => {
                sendHtml(res, (`${dirPages}/${element}`))
            })
        }
        console.log(link)
        router.get(link, (req, res) => {
            sendHtml(res, (`${dirPages}/${element}`))
        })
    })
}

callListDirPages()

module.exports = router;