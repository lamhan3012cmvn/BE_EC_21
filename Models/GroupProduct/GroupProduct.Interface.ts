import { Document } from 'mongoose';
export interface IGroupProduct extends Document {
  name:string,
  status:string,
  FK_merchant?:string
}