import { Document } from 'mongoose';
export interface ICartProduct{
  current:Array<string>,
  quantity:number,
  status:string
}
export interface ICart{
	products:ICartProduct,
  FK_CreateUser:string,
}
export interface ICartDocument extends Document,ICart {

}