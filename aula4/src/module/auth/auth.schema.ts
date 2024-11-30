import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string({
    required_error: 'O e-mail é obrigatório',
  }).email({
    message: 'E-mail não é válido'
  }),
  password: z.string({
    required_error: 'A senha é obrigatória',
    message: 'O campo senha deve conter letras e números',
  }).min(8, {
    message: 'A senha deve conter no mínimo 8 caracteres'
  }).max(13)
})

export const registerSchema = z.object({
  email: z.string().email({
    message: 'E-mail não é válido'
  }),
  password: z.string().min(8, {
    message: 'A senha deve conter no mínimo 8 caracteres'
  })
})