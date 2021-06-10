import { Document } from 'mongoose';
export interface IProductClient{
  _id?:string,
  name:string,
  weight:string,
  type:string,
  image:Array<string>
}
export interface ICartClient{
	products:Array<IProductClient>,
  status?:string,
  FK_CreateUser?:string,
}
export interface ICartDocument extends Document,ICartClient {

}


