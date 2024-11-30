import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Router, Request, Response } from 'express'
import { UserStore, userRepository } from '../user'
import authenticateMiddleware from '../../middleware/authenticate'
import { loginSchema, registerSchema } from './auth.schema'
import validateSchemaMiddleware from '../../middleware/validateSchema'

export const router = Router()

router.post('/register', validateSchemaMiddleware(registerSchema), async (req: Request, res: Response) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);

  const result = await userRepository.default.store(req.body as UserStore)

  const token = jwt.sign({
    id: result._id
  }, process.env.JWT_SECRET || '')

  res.json({
    msg: 'Usuário cadastrado',
    token
  })
})

router.get('/me', authenticateMiddleware, async (_req: Request, res: Response) => {
  res.json({
    msg: 'Usuário identificado',
    user: res.locals.user
  })
})

router.post('/login', validateSchemaMiddleware(loginSchema), async (req: Request, res: Response) => {
  // TODO receber os dados do corpo da requisição
  const body = req.body

  // TODO verificar se existe um usuário na minha base de dados contendo o e-mail que veio pelo body requisition
  const result = await userRepository.default.getByEmail(body.email)

  // TODO validar o banco de dados retornou um usuário
  if(!result) {
    res.status(404).json({
      msg: 'Usuário não encontrado'
    })
    return
  }
  
  // TODO verificar se a senha que veio via body requisition é a mesma senha cadastrada no banco
  const isValidPassword = bcrypt.compareSync(body.password, result.password);

  if (!isValidPassword) {
    res.status(403).json({
      msg: 'Dados da autenticação não conferem'
    })
    return
  }

  // TODO crio um token para o usuário e entrego como resposta da requisição
  const token = jwt.sign({
    id: result._id
  }, process.env.JWT_SECRET || '')

  res.json({
    token: `Bearer ${token}`
  })
})

export default router