import { Document } from 'mongoose';

export interface ITransportSub{
	name:string,
	city:string,
	address:string,
	phoneNumber:string,
	mail:string,
	FK_Transport:string,
	FK_CreateUser:string,
	FK_TransportCity?:string,
}
export interface ITransportSubDocument extends Document,ITransportSub {

}
