import { Product, ProductStore, ProductUpdate } from "./product";
import { ProductModel } from './product.model';

const getAll = async (): Promise<Product[]> => {
  const products = await ProductModel.find();
  return products
}

const getById = async (_id: string): Promise<Product | null> => {
  const product = await ProductModel.findOne({
    _id
  });

  return product
}

const store = async (params: ProductStore): Promise<Product> => {
  const product = ProductModel.create(params)

  return product
}

const update = async (_id: string, params: ProductUpdate): Promise<{
  modifiedCount: number
}> => {
  const product = await ProductModel.updateOne({
    _id
  },
  params)

  return product
}

const destroy = async (_id: string): Promise<{
  deletedCount: number
}> => {
  const result = await ProductModel.deleteOne({ _id })
  return result
}

export default {
  getAll,
  getById,
  store,
  update,
  destroy,
}