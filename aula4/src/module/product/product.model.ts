import mongoose from "mongoose";
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
  }
})

export const ProductModel = mongoose.model('products', productsSchema)