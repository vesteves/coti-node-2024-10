import express, { Request, Response } from 'express'

const app = express()

app.use(express.json())

interface Base {
  id: number
}

interface UserBase {
  name: string
  age: number
}

type User = UserBase & Base

type UserStore = UserBase

type UserUpdate = Partial<UserBase>

let users: User[] = []

app.get('/user', (_req: Request, res: Response) => {
  res.json(users)
})

app.get('/user/:id', (req: Request, res: Response) => {
  const result = users.find(user => user.id === parseInt(req.params.id, 10))
  res.json(result)
})

app.post('/user', (req: Request, res: Response) => {
  /**
   * name: 'Vitor'
   * age: 38
  */
  users.push({
    ...req.body as UserStore,
    id: users.length + 1
  })
  res.json({
    msg: "Usuario cadastrado"
  })
})

app.put('/user/:id', (req: Request, res: Response) => {
  /**
   * name: 'Ace'
   * age: 38
  */
  users = users.map(user => {
    if (user.id === Number(req.params.id)) {
      return {
        ...user,
        ...req.body as UserUpdate,
      }
    }
    return user
  })
  res.json({
    msg: 'Usuario atualizado'
  })
})

app.delete('/user/:id', (req: Request, res: Response) => {
  users = users.filter(user => user.id !== Number(req.params.id))
  res.json({
    msg: 'Usuario removido!'
  })
})

app.listen(8000, () => {
  console.log('Server ON')
})
