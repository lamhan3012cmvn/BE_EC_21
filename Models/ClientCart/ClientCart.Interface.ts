import { Document } from 'mongoose';
export interface ICartProduct{
  name:string,
  weight:string,
  type:string,
  image:Array<string>
}
export interface ICart{
	products:Array<ICartProduct>,
  status?:string,
  FK_CreateUser?:string,
}
export interface ICartDocument extends Document,ICart {

}


