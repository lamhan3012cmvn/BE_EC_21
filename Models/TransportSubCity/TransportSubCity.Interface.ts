import { Document } from 'mongoose';


export interface ITransportSubCity {
  name:string,
	district:string,
  ward?: string,
  coordinates?:string,
  phoneNumber?:string,
  mail?:string,
  status?:string,

  FK_Transport_Sub:string,
  FK_Staff?:Array<string>,
  FK_AwaitPackage?:Array<string>,
  FK_CreateUser?:string
}
export interface ITransportSubCityDocument extends Document,ITransportSubCity
{
	
}
