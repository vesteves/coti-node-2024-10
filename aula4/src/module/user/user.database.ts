import mongoose from "mongoose";
import { User } from "./user";

const usersSchema = new mongoose.Schema<User, mongoose.Model<User>>({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  }
})

export const UserDb = mongoose.model('users', usersSchema)