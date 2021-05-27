import { ILocation } from './../Package/Package.Interface';
import { Document } from 'mongoose';

export interface ITransportSub{
	name:string,
	location:ILocation,
	phoneNumber?:string,
	mail?:string,
	status?:string,
	FK_Transport:string,
	FK_CreateUser?:string,                               
}
export interface ITransportSubDocument extends Document,ITransportSub {

}
