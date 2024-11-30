import { Types } from "mongoose"
import { z } from 'zod'
import { createProductSchema, updateProductSchema } from './product.schema'

export interface Base {
  _id: Types.ObjectId
}

export type ProductStore = z.infer<typeof createProductSchema>

export type ProductUpdate = z.infer<typeof updateProductSchema>

export type Product = ProductStore & Base