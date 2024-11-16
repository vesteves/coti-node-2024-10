import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import userRouter from './module/user/user.controller'
import authRouter from './module/auth/auth.controller'
import mongoose from 'mongoose'

const app = express()

app.use(express.json())

// rotas
app.use('/user', userRouter)
app.use('/auth', authRouter)

// http://localhost:8000/auth/register
// http:// = PROTOCOLO
// localhost = DOMINIO
// :8000 = PORTA
// /auth = PREFIXO
// /register = ROTA

app.listen(process.env.PORT || 8000, async () => {
  await mongoose.connect(process.env.DB_CONNECTION_STRING || '');

  console.log('Server ON')
})
