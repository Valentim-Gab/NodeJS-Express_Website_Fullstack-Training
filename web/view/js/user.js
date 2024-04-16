const tabUser = document.getElementById('tabUser')
const API_URL = 'http://localhost:3000'
let campoNome = document.getElementById('nome')
let campoIdade = document.getElementById('idade')

const listar = async () => {
    const res = await fetch(`${API_URL}/user/getAll/`).then((data) => data.json())
    res.map(user => addUserLista(user))
}

const searchUser = async () => {
    let searchInput = document.getElementById('searchInput').value

    const res = await fetch(`${API_URL}/user/search/${searchInput}`).then((data) => data.json())
    res.map(user => addUserListaSearch(user))
}

const getOne = async (id) => {
    const res = await fetch(`${API_URL}/user/getOne/${id}/`).then((data) => data.json())
    return (res[0])
}

const addUserLista = ({ id, nome, idade }) => {
    let trBody = document.createElement('tr')
    let tdNome = document.createElement('td')
    let tdIdade = document.createElement('td')
    let tdAcao = document.createElement('td')
    let buttonApagar = document.createElement('button')
    let buttonAtualizar = document.createElement('button')

    buttonApagar.innerHTML = "APAGAR"
    buttonApagar.onclick = () => { deletarUser(tdNome, id) }

    buttonAtualizar.innerHTML = "EDITAR"
    buttonAtualizar.onclick = () => { window.location = `/user/${id}/editar` }

    tdNome.innerHTML = nome
    tdIdade.innerHTML = idade

    tdAcao.append(buttonAtualizar)
    tdAcao.append(document.createElement('br'))
    tdAcao.append(buttonApagar)

    trBody.appendChild(tdNome)
    trBody.appendChild(tdIdade)
    trBody.appendChild(tdAcao)

    tabUser.appendChild(trBody)
}

const addUserListaSearch = ({ id, nome, idade }) => {
    const tabUserSearch = document.getElementById('tabUserSearch')

    let trBody = document.createElement('tr')
    let tdNome = document.createElement('td')
    let tdIdade = document.createElement('td')
    // let tdAcao = document.createElement('td')
    let buttonApagar = document.createElement('button')
    let buttonAtualizar = document.createElement('button')

    tdNome.innerHTML = nome
    tdIdade.innerHTML = idade

    // tdAcao.append(buttonAtualizar)
    // tdAcao.append(document.createElement('br'))
    // tdAcao.append(buttonApagar)

    trBody.appendChild(tdNome)
    trBody.appendChild(tdIdade)
    // trBody.appendChild(tdAcao)

    tabUserSearch.appendChild(trBody)
}


const newUser = async () => {
    const update = {
        nome: campoNome.value,
        idade: campoIdade.value
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(update),
    };
    fetch(`${API_URL}/user/add/`, options).then(data => {
        if (!data.ok) {
            throw Error(data.status)
        }
        return data.json
    })
    location.reload()
}

const deletarUser = (tdNome, id) => {
    if (confirm('Tem certeza que deseja deletar?')) {
        tdNome.parentNode.remove()

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        fetch(`${API_URL}/user/del/${id}`, options).then(data => {
            if (!data.ok) {
                throw Error(data.status)
            }
            return data.json
        })
    }
}

const addUserOne = async () => {
    let id = window.location.href.split("/")[4]
    let { nome, idade } = await getOne(id)
    let campoId = document.getElementById('id')
    campoId.value = id
    campoNome.value = nome
    campoIdade.value = idade
}

const updateUser = () => {
    let campoId = document.getElementById('id')
    let id = campoId.value

    const update = {
        nome: nome.value,
        idade: idade.value
    };

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(update),
    };
    fetch(`${API_URL}/user/upd/${id}`, options).then(data => {
        if (!data.ok) {
            throw Error(data.status)
        }
        return data.json
    })
}

const addClass = (el, classe) => {
    var classes = el.className.split(' ');
    var getIndex = classes.indexOf(classe);

    if (getIndex === -1) {
        classes.push(classe);
        el.className = classes.join(' ');
    }
}

const delClass = (el, classe) => {
    var classes = el.className.split(' ');
    var getIndex = classes.indexOf(classe);

    if (getIndex > -1) {
        classes.splice(getIndex, 1);
    }
    el.className = classes.join(' ');
}