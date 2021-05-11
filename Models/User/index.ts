import { IUserDocument } from './User.Interface';
import mongoose from 'mongoose';
import  createSchema  from '../Base.Model';
import UserSchema from "./User.Model"

const User = mongoose.model<IUserDocument>('User', createSchema(UserSchema));

export default User