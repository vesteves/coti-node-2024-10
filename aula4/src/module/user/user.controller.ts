import bcrypt from 'bcrypt'
import { Router, Request, Response } from 'express'
import { UserStore, UserUpdate } from './user.d'
import userRepository from './user.repository'
import validateSchema from '../../middleware/validateSchema'
import { createUserSchema } from './user.schema'

export const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  const result = await userRepository.getAll()
  res.json(result)
})

router.get('/:id', async (req: Request, res: Response) => {
  const result = await userRepository.getById(req.params.id)
  res.json(result)
})

router.post('/', validateSchema(createUserSchema), async (_req: Request, res: Response) => {
  res.locals.validated.password = bcrypt.hashSync(res.locals.validated.password, 10);

  const result = await userRepository.store(res.locals.validated as UserStore)
  res.json({
    msg: "Usuario cadastrado"
  })
})

router.put('/:id', async (req: Request, res: Response) => {
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

  const result = await userRepository.update(req.params.id, req.body as UserUpdate)

  res.json({
    msg: 'Usuario atualizado'
  })
  return
})

router.delete('/:id', async (req: Request, res: Response) => {
  const result = await userRepository.destroy(req.params.id)
  res.json({
    msg: 'Usuario removido!'
  })
})

export default router