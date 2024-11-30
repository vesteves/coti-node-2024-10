import { z } from 'zod'

export const createCategorySchema = z.object({
  name: z.string({
    required_error: 'O nome é obrigatório',
    message: 'O campo posição deve conter letras e/ou números',
  }),
  position: z.number({
    required_error: 'A posição é obrigatória',
    message: 'O campo posição deve conter apenas números',
  }).int({
    message: 'O campo posição deve conter um número inteiro',
  }),
})

export const updateCategorySchema = z.object({
  name: z.string({
    required_error: 'O nome é obrigatório',
    message: 'O campo posição deve conter letras e/ou números',
  }).optional(),
  position: z.number({
    message: 'O campo posição deve conter apenas números',
  }).int({
    message: 'O campo posição deve conter um número inteiro',
  }).optional(),
})
