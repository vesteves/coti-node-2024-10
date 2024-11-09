import { Types } from "mongoose"

export interface Base {
  _id: Types.ObjectId
}

// export interface User {
//   id: number
//   email: string
//   password: string
// }

// export interface UserStore {
//   email: string
//   password: string
// }

// export interface UserUpdate {
//   email?: string
//   password?: string
// }

export interface UserBase {
  email: string
  password: string
}

export type User = UserBase & Base

export type UserStore = UserBase

export type UserUpdate = Partial<UserBase>
