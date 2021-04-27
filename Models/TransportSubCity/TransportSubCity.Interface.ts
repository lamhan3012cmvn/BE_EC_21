import { Document } from 'mongoose';
export interface ITransportSubCity extends Document
{
	name:string,
	district:string,
  ward: string,
  coordinates:string,
  phoneNumber:string,
  mail:string,
  FK_AwaitPackage:Array<string>
};
