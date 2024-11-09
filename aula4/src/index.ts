import express from 'express'
import userRouter from './module/user/user.controller'
import mongoose from 'mongoose'

const app = express()

app.use(express.json())

// rotas
app.use('/user', userRouter)

app.listen(8000, async () => {
  await mongoose.connect('mongodb://username:password@127.0.0.1:27017/projeto?authSource=admin');

  console.log('Server ON')
})
