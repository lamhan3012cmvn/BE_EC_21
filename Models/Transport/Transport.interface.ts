import { Document } from 'mongoose';
export interface ITransport extends Document {
  name:string,
	description:string,
	image:string,
	imageVerify:string,
	typeSupport:string,
	phone:string,
	status:string,
	headquarters:string,
	bankAccount:string,
	FK_createUser:string
}
