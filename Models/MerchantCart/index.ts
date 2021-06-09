import mongoose from 'mongoose';

import { ICartDocument } from './MechantCart.Interface';
import  createSchema  from '../Base.Model';
import CartSchema from './MerchantCart.Model';

const Cart = mongoose.model<ICartDocument>('Cart', createSchema(CartSchema));
export default Cart