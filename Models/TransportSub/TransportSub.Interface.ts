import { Document } from 'mongoose';
export interface ITransportSub extends Document {
  name:string,
	city:string,
	address:string,
	phoneNumber:string,
	mail:string,
	FK_Transport:string,
	FK_TransportCity:string,
}
