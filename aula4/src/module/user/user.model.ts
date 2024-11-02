import { User, UserStore, UserUpdate } from "./user.d";

let users: User[] = []

const getAll = (): User[] => {
  return users
}

const getById = (id: number): User | undefined => {
  return users.find(user => user.id === id)
}

const store = (params: UserStore) => {
  users.push({
    ...params,
    id: users.length + 1
  })
}

const update = (id: number, params: UserUpdate) => {
  users = users.map(user => {
    if (user.id === id) {
      return {
        ...user,
        ...params,
      }
    }
    return user
  })
}

const destroy = (id: number) => {
  users = users.filter(user => user.id !== id)
}

export default {
  getAll,
  getById,
  store,
  update,
  destroy,
}