import mongoose from 'mongoose';

import { ICartDocument } from './ClientCart.Interface';
import  createSchema  from '../Base.Model';
import CartSchema from './ClientCart.Model';

const ClientCart = mongoose.model<ICartDocument>('ClientCart', createSchema(CartSchema));
export default ClientCart