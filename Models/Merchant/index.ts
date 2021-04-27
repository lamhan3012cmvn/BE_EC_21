import { IMerchant } from './Merchant.interface';
import mongoose from 'mongoose';
import createSchema from '../Base.Model';

import MerchantSchema from './Merchants.Model'

const Merchant = mongoose.model<IMerchant>('Merchant', createSchema(MerchantSchema));
export default Merchant