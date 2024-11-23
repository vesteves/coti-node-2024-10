import { User, UserStore, UserUpdate } from "./user";
import { UserModel } from './user.model';

const getAll = async (): Promise<User[]> => {
  const users = await UserModel.find();
  return users
}

const getById = async (_id: string): Promise<User | null> => {
  const user = await UserModel.findOne({
    _id
  });

  return user
}

const getByEmail = async (email: string): Promise<User | null> => {
  const user = await UserModel.findOne({
    email
  });

  return user
}

const store = async (params: UserStore): Promise<User> => {
  const user = new UserModel()
  user.email = params.email
  user.password = params.password
  const result = await user.save()

  return result
}

const update = async (_id: string, params: UserUpdate): Promise<{
  modifiedCount: number
}> => {
  const user = await UserModel.updateOne({
    _id
  },
  params)

  return user
}

const destroy = async (_id: string): Promise<{
  deletedCount: number
}> => {
  const result = await UserModel.deleteOne({ _id })
  return result
}

export default {
  getAll,
  getById,
  getByEmail,
  store,
  update,
  destroy,
}