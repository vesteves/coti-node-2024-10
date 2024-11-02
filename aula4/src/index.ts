import express from 'express'
import userRouter from './module/user/user.controller'

const app = express()

app.use(express.json())

// rotas
app.use('/user', userRouter)

app.listen(8000, () => {
  console.log('Server ON')
})
