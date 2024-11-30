import { Types } from "mongoose"
import { z } from 'zod'
import { createUserSchema, updateUserSchema } from './user.schema'

export interface Base {
  _id: Types.ObjectId
}

export type UserStore = z.infer<typeof createUserSchema>

export type UserUpdate = z.infer<typeof updateUserSchema>

export type User = UserStore & Base