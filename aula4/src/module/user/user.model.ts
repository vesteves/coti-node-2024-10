import { User, UserStore, UserUpdate } from "./user.d";
import { UserDb } from './user.database';

const getAll = async (): Promise<User[]> => {
  const users = await UserDb.find();
  return users
}

const getById = async (_id: string): Promise<User | null> => {
  const user = await UserDb.findOne({
    _id
  });

  return user
}

const getByEmail = async (email: string): Promise<User | null> => {
  const user = await UserDb.findOne({
    email
  });

  return user
}

const store = async (params: UserStore): Promise<User> => {
  const user = new UserDb()
  user.email = params.email
  user.password = params.password
  const result = await user.save()

  return result
}

const update = async (_id: string, params: UserUpdate): Promise<{
  modifiedCount: number
}> => {
  const user = await UserDb.updateOne({
    _id
  },
  params)

  return user
}

const destroy = async (_id: string): Promise<{
  deletedCount: number
}> => {
  const result = await UserDb.deleteOne({ _id })
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