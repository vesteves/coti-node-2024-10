import mongoose from "mongoose";
import { Category } from "./category";

const categoriesSchema = new mongoose.Schema<Category, mongoose.Model<Category>>({
  name: {
    type: String,
    require: true,
  },
  position: {
    type: Number,
    require: true,
  }
})

categoriesSchema.virtual('products', {
  ref: 'products',
  localField: '_id',
  foreignField: 'category'
});

categoriesSchema.set('toJSON', { virtuals: true });
categoriesSchema.set('toObject', { virtuals: true });

export const CategoryModel = mongoose.model('categories', categoriesSchema)