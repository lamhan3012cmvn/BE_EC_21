import { Document } from 'mongoose';
export interface ICoupon extends Document {
  name:string,
  image:string,
  totalCode:number,
  discountByAmount:boolean,
  discountByPercent:boolean,
  discountAmount:string,
  discountPercent:string,
  status:string,
  expiredDate:string
}
