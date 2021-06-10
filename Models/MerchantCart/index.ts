import mongoose from 'mongoose';

import { ICartMerchantDocument } from './MechantCart.Interface';
import  createSchema  from '../Base.Model';
import CartSchema from './MerchantCart.Model';

const MerchantCart = mongoose.model<ICartMerchantDocument>('MerchantCart', createSchema(CartSchema));
export default MerchantCart