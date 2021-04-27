import mongoose from 'mongoose';

import { ICart } from './Cart.Interface';
import  createSchema  from '../Base.Model';
import CartSchema from './Cart.Model';

const Cart = mongoose.model<ICart>('Cart', createSchema(CartSchema));
export default Cart