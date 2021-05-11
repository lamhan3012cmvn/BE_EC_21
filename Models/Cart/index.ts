import mongoose from 'mongoose';

import { ICartDocument } from './Cart.Interface';
import  createSchema  from '../Base.Model';
import CartSchema from './Cart.Model';

const Cart = mongoose.model<ICartDocument>('Cart', createSchema(CartSchema));
export default Cart