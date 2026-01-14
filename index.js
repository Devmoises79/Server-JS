const express = require('express')
const app = express()
const port = 3000

const path = require('path')


app.use(
    express.urlencoded({
        extended: true
    }),
)

app.use(express.json())


const basePath = path.join(__dirname, 'templates')



app.get('/users/add', (req, res) => {

    res.sendFile(`${basePath}/userform.html`)
})


app.post('/users/save', (req, res) => {
    console.log(req.body)
    
    const name = req.body.name
    const age = req.body.age

    console.log(`O nome do usuário é ${name} e ele tem ${age} anos`)
    
    res.sendFile(`${basePath}/users.html`)

    if (age >= 18){
        console.log('Maior de idade')
    } else {
        console.log(`${name} é menor de idade. Idade: ${age} anos`)
    }
})


app.get('/users/:id', (req, res) => {
    const id = req.params.id

    console.log(`Buscando o usuário ${id}`)

    res.sendFile(`${basePath}/users.html`)
    
})



checkAuth = function(req, res, next) {
    req.authStatus = false
    
    if (req.authStatus){
        console.log('Está logado, pode continuar')   
        next()
    } else {
        console.log('Não está logado, faça o login para continuar')
        next()
    }   
}

app.use(checkAuth)




app.get('/', (req, res) => {

    res.sendFile(`${basePath}/index.html`)

})


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})