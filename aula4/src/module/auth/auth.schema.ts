import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(13)
})

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})