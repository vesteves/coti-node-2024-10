const express = require('express')
const app = express()

// esta é a configuração para que meu servidor Express.js entenda JSON como body requisition
app.use(express.json())

// RESTFUL API
/**
 * GET:    coletar dados
 * POST:   enviar dados
 * PUT:    atulizar dados
 * DELETE: remover dados
*/

/**
 * parâmetro req do callback: significa requisição
 * parâmetro res do callback: significa resposta
 */

let users = [
  {
    id: 1,
    nome: "Dandara"
  },
  {
    id: 2,
    nome: "João"
  },
  {
    id: 3,
    nome: "Bruno"
  },
]

// Coletar a lista de usuários
app.get('/user', (req, res) => {
  return res.json(users)
})

// Coletar apenas 1 usuário
app.get('/user/:id', (req, res) => {
  const user = users.find(user => user.id == req.params.id)

  return res.json(user)
})

// Salvar um usuário
app.post('/user', (req, res) => {
  console.log("este é o req.body da requisição", req.body.nome)

  const newUser = {
    id: users.length + 1,
    nome: req.body.nome
  }

  users.push(newUser)

  return res.status(201).json({
    msg: 'Usuário criado',
    user: newUser
  })
})

// Atualizar um usuário
app.put('/user/:id', (req, res) => {
  users = users.map(user => {
    if (req.params.id == user.id) {
      return {
        ...user,
        nome: req.body.nome
      }
    }

    return user
  })
  return res.json({
    msg: 'Usuário atualizado'
  })
})

// Remover um usuário
app.delete('/user/:id', (req, res) => {
  users = users.filter(user => req.params.id != user.id)

  return res.json({
    msg: 'Usuário removido'
  })
})

app.listen(8000, () => {
  console.log('Servidor ON!')
})