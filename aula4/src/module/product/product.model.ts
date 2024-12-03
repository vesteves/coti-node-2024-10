import mongoose, { Schema } from "mongoose";
import { Product } from "./product";

const productsSchema = new mongoose.Schema<Product, mongoose.Model<Product>>({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  discount: {
    type: Number,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'categories',
  }
})

export const ProductModel = mongoose.model('products', productsSchema)