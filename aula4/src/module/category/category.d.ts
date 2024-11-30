import { Types } from "mongoose"
import { z } from 'zod'
import { createCategorySchema, updateCategorySchema } from './category.schema'

export interface Base {
  _id: Types.ObjectId
}

export type CategoryStore = z.infer<typeof createCategorySchema>

export type CategoryUpdate = z.infer<typeof updateCategorySchema>

export type Category = CategoryStore & Base