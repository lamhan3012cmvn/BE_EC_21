import { Document } from 'mongoose';
export interface ICartProduct{
  idProduct:string,
  quantity:number,
  
}
export interface ICart{
	products:ICartProduct,
  status:string,
  FK_CreateUser:string,
}
export interface ICartDocument extends Document,ICart {

}


