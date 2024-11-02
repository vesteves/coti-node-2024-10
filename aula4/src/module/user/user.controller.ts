import bcrypt from 'bcrypt'
import { Router, Request, Response } from 'express'
import { UserStore, UserUpdate } from './user.d'
import userModel from './user.model'

export const router = Router()

router.get('/', (_req: Request, res: Response) => {
  const result = userModel.getAll()
  res.json(result)
})

router.get('/:id', (req: Request, res: Response) => {
  const result = userModel.getById(Number(req.params.id))
  res.json(result)
})

router.post('/', (req: Request, res: Response) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);

  const result = userModel.store(req.body as UserStore)
  res.json({
    msg: "Usuario cadastrado"
  })
})

router.put('/:id', (req: Request, res: Response) => {
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

  const result = userModel.update(Number(req.params.id), req.body as UserUpdate)
  res.json({
    msg: 'Usuario atualizado'
  })
})

router.delete('/:id', (req: Request, res: Response) => {
  const result = userModel.destroy(Number(req.params.id))
  res.json({
    msg: 'Usuario removido!'
  })
})

router.post('/login', (req: Request, res: Response) => {
  const user = userModel.getAll()

  if (user.length === 0) {
    res.json({
      msg: 'Usuário não encontrado'
    })
  }
  const result = bcrypt.compareSync(req.body.password, user[0].password);
  
  res.json(result)
})

export default router