import mongoose from 'mongoose';

import { ICartDocument } from './ClientCart.Interface';
import  createSchema  from '../Base.Model';
import CartSchema from './ClientCart.Model';

const Cart = mongoose.model<ICartDocument>('MerchantCart', createSchema(CartSchema));
export default Cart