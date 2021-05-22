import { Document } from 'mongoose';
export interface ICategories extends Document {
	name:string,
  status:string
}
