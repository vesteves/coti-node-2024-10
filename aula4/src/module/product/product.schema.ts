import { z } from 'zod'
import { isValidObjectId } from 'mongoose';

export const createProductSchema = z.object({
  name: z.string({
    required_error: 'O nome é obrigatório',
    message: 'O campo nome deve conter letras e/ou números',
  }),
  description: z.string({
    required_error: 'A descrição é obrigatório',
    message: 'O campo descrição deve conter letras e/ou números',
  }),
  price: z.number({
    required_error: 'O preço é obrigatório',
    message: 'O campo preço deve conter apenas números',
  }).int({
    message: 'O campo preço deve conter um número inteiro',
  }),
  discount: z.number({
    message: 'O campo desconto deve conter apenas números',
  }).int({
    message: 'O campo desconto deve conter um número inteiro',
  }).optional(),
  category: z.custom((val) => isValidObjectId(val), {
    message: 'O campo category deve ser um ObjectId válido',
  }),
})

export const updateProductSchema = z.object({
  name: z.string({
    message: 'O campo nome deve conter letras e/ou números',
  }).optional(),
  price: z.number({
    message: 'O campo preço deve conter apenas números',
  }).int({
    message: 'O campo preço deve conter um número inteiro',
  }).optional(),
  discount: z.number({
    message: 'O campo desconto deve conter apenas números',
  }).int({
    message: 'O campo desconto deve conter um número inteiro',
  }).optional(),
  category: z.custom((val) => isValidObjectId(val), {
    message: 'O campo category deve ser um ObjectId válido',
  }).optional()
})
