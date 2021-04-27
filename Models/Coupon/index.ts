import { ICoupon } from './Coupons.interface';
import mongoose from 'mongoose';
import createSchema from '../Base.Model';
import CouponsSchema from './Coupons.Model'

const Coupons = mongoose.model<ICoupon>('Coupons', createSchema(CouponsSchema));
export default Coupons