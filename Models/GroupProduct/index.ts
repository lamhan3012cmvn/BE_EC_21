import mongoose from 'mongoose';
import createSchema from '../Base.Model';
import { IGroupProduct } from './GroupProduct.Interface';
import GroupProductSchema from './GroupProduct.Model'

const GroupProduct = mongoose.model<IGroupProduct>(
	'GroupProduct',
	createSchema(GroupProductSchema)
);

export default GroupProduct