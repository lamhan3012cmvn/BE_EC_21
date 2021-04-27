import mongoose from 'mongoose';
import createSchema from '../Base.Model';
import { IOrder } from './Order.Interface';
import OrderSchema from "./Order.Model"

const Order = mongoose.model<IOrder>('Order', createSchema(OrderSchema));
export default Order