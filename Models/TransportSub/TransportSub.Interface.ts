import { Document } from 'mongoose';

export interface ITransportSub{
	name:string,
	city:string,
	address?:string,
	phoneNumber?:string,
	mail?:string,
	status?:string,
	FK_Transport:string,
	FK_CreateUser?:string,                               
}
export interface ITransportSubDocument extends Document,ITransportSub {

}
