import bcrypt from 'bcrypt'
import { Router, Request, Response } from 'express'
import { UserStore, UserUpdate } from './user.d'
import userRepository from './user.repository'
import validateSchema from '../../middleware/validateSchema'
import { createUserSchema, updateUserSchema } from './user.schema'

export const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await userRepository.getAll()
    res.json(result)
  } catch (error:any) {
    console.error('Error on user.controller.ts', error.message)
    res.status(500).json({
      error: 'Não foi possível coletar dados de usuários'
    })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await userRepository.getById(req.params.id)
    res.json(result)
  } catch (error: any) {
    console.error('Error on user.controller.ts', error.message)
    res.status(500).json({
      error: `Não foi possível coletar dados do usuário ${req.params.id}`
    })
  }
})

router.post('/', validateSchema(createUserSchema), async (_req: Request, res: Response) => {
  res.locals.validated.password = bcrypt.hashSync(res.locals.validated.password, 10);

  try {
    const result = await userRepository.store(res.locals.validated as UserStore)
    console.log('Usuário cadastrado', result)
    res.json({
      msg: "Usuario cadastrado"
    })
  } catch (error:any) {
    console.error('Error on user.controller.ts', error.message)
    res.status(500).json({
      error: `Não foi possível cadastrar usuário`
    })
  }
})

router.put('/:id', validateSchema(updateUserSchema), async (req: Request, res: Response) => {
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

  try {
    const result = await userRepository.update(req.params.id, req.body as UserUpdate)
    console.log(`Usuário ${req.params.id} atualizado`, result)

    res.json({
      msg: 'Usuario atualizado'
    }) 
  } catch (error:any) {
    console.error('Error on user.controller.ts', error.message)
    res.status(500).json({
      error: `Não foi possível atualizar usuário ${req.params.id}`
    })
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await userRepository.destroy(req.params.id)
    console.log(`Usuário ${req.params.id} removido`, result)

    res.json({
      msg: 'Usuario removido!'
    })
  } catch (error: any) {
    console.error('Error on user.controller.ts', error.message)
    res.status(500).json({
      error: `Não foi possível remover usuário ${req.params.id}`
    })
  }
})

export default router