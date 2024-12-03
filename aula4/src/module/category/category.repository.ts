import { Category, CategoryStore, CategoryUpdate } from "./category";
import { CategoryModel } from './category.model';

const getAll = async (): Promise<Category[]> => {
  const categories = await CategoryModel.find().populate('products').lean();
  return categories
}

const getById = async (_id: string): Promise<Category | null> => {
  const category = await CategoryModel.findOne({
    _id
  });

  return category
}

const store = async (params: CategoryStore): Promise<Category> => {
  const category = CategoryModel.create(params)

  return category
}

const update = async (_id: string, params: CategoryUpdate): Promise<{
  modifiedCount: number
}> => {
  const category = await CategoryModel.updateOne({
    _id
  },
  params)

  return category
}

const destroy = async (_id: string): Promise<{
  deletedCount: number
}> => {
  const result = await CategoryModel.deleteOne({ _id })
  return result
}

export default {
  getAll,
  getById,
  store,
  update,
  destroy,
}