import { Document } from 'mongoose';


export interface ITransportSubCity {
  name:string,
	district:string,
  ward: string,
  coordinates:string,
  phoneNumber:string,
  mail:string,
  FK_Staff?:Array<string>,
  FK_AwaitPackage?:Array<string>
}
export interface ITransportSubCityDocument extends Document,ITransportSubCity
{
	
}
