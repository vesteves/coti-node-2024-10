import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import userRepository from '../module/user/user.repository'

const verifyToken = (token: string, res: Response) => {
  try {
    const tokenVerified = jwt.verify(token, process.env.JWT_SECRET || '')

    if (typeof(tokenVerified) !== 'object') {
      res.json({
        msg: 'Token inválido',
      })
      return
    }

    return tokenVerified.id
  } catch (error) {
    res.json({
      msg: 'Token inválido',
    })
  }
}

export const authenticateMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if(!req.headers.authorization) {
    res.json({
      msg: 'Token não encontrado na requisição'
    })
    return
  }

  const token = req.headers.authorization.split(' ')[1]

  const tokenVerified = verifyToken(token, res)

  if (!tokenVerified) {
    return
  }

  const user = await userRepository.getById(tokenVerified)
    
  if(!user) {
    res.json({
      msg: 'Usuário não tem permissão',
    })
    return
  }

  res.locals.user = user
  
  next()
}

export default authenticateMiddleware