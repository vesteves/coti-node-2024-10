import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Router, Request, Response } from 'express'
import { UserStore } from '../user/user.d'
import userModel from '../user/user.model'

export const router = Router()

router.post('/register', async (req: Request, res: Response) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);

  const result = await userModel.store(req.body as UserStore)

  const token = jwt.sign({
    id: result._id
  }, process.env.JWT_SECRET || '')

  res.json({
    msg: 'Usuário cadastrado',
    token
  })
})

router.get('/me', async (req: Request, res: Response) => {
  // req.body
  // req.params
  // req.query
  // req.headers

  if(!req.headers.authorization) {
    res.json({
      msg: 'Token não encontrado na requisição'
    })
    return
  }

  // req.headers.authorization = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzdkMDNjM2FjNjM1MDI2MGI5YzFhNSIsImlhdCI6MTczMTcxMTAzNn0.xx615BHQyzEztZCJelEio2ygXbJ4hQT5mViPD2_2S6c
  // split(' ') = transforma uma string em um array criando ponteiros a partir de um ou mais caracteres passados como parâmetro. Neste caso, utilizando um ESPAÇO VAZIO como parâmetro do método split()
  // ponteiro 0 = Bearer
  // ponteiro 1 = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzdkMDNjM2FjNjM1MDI2MGI5YzFhNSIsImlhdCI6MTczMTcxMTAzNn0.xx615BHQyzEztZCJelEio2ygXbJ4hQT5mViPD2_2S6c
  const token = req.headers.authorization.split(' ')[1]

  const result = jwt.verify(token, process.env.JWT_SECRET || '')

  if (typeof(result) !== 'object') {
    res.json({
      msg: 'Token inválido',
    })
    return
  }

  const user = await userModel.getById(result.id)
    
    res.json({
      msg: 'Usuário identificado',
      user
    })
})

router.post('/login', async (req: Request, res: Response) => {
  // TODO receber os dados do corpo da requisição
  const body = req.body

  // TODO verificar se existe um usuário na minha base de dados contendo o e-mail que veio pelo body requisition
  const result = await userModel.getByEmail(body.email)

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