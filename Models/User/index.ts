import { IUser } from './User.Interface';
import mongoose from 'mongoose';
import  createSchema  from '../Base.Model';
import UserSchema from "./User.Model"

const User = mongoose.model<IUser>('User', createSchema(UserSchema));

export default User