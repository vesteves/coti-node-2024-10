import bcrypt from 'bcrypt'
import { Router, Request, Response } from 'express'
import { UserStore, UserUpdate } from './user.d'
import userModel from './user.model'

export const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  const result = await userModel.getAll()
  res.json(result)
})

router.get('/:id', async (req: Request, res: Response) => {
  const result = await userModel.getById(req.params.id)
  res.json(result)
})

router.post('/', async (req: Request, res: Response) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);

  const result = await userModel.store(req.body as UserStore)
  console.log(result)
  res.json({
    msg: "Usuario cadastrado"
  })
})

router.put('/:id', async (req: Request, res: Response) => {
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

  const result = await userModel.update(req.params.id, req.body as UserUpdate)

  res.json({
    msg: 'Usuario atualizado'
  })
  return
})

router.delete('/:id', async (req: Request, res: Response) => {
  const result = await userModel.destroy(req.params.id)
  res.json({
    msg: 'Usuario removido!'
  })
})

// router.post('/login', (req: Request, res: Response) => {
//   const user = userModel.getAll()

//   if (user.length === 0) {
//     res.json({
//       msg: 'Usuário não encontrado'
//     })
//   }
//   const result = bcrypt.compareSync(req.body.password, user[0].password);
  
//   res.json(result)
// })

export default router