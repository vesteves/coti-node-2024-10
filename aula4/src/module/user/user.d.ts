import { Types } from "mongoose"

export interface Base {
  _id: Types.ObjectId
}

export interface UserBase {
  email: string
  password: string
}

export type User = UserBase & Base

export type UserStore = UserBase

export type UserUpdate = Partial<UserBase>
