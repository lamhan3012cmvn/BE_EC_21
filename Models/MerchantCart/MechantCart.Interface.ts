import { Document } from 'mongoose';
export interface IProductCartMerchant{
  idProduct:string,
  quantity:number,
  
}
export interface ICartMerchat{
	products:Array<IProductCartMerchant>,
  status:string,
  FK_CreateUser:string,
}
export interface ICartMerchantDocument extends Document,ICartMerchat {

}
 