import mongoose from 'mongoose';

import { ICartDocument } from './MechantCart.Interface';
import  createSchema  from '../Base.Model';
import CartSchema from './MerchantCart.Model';

const MerchantCart = mongoose.model<ICartDocument>('MerchantCart', createSchema(CartSchema));
export default MerchantCart