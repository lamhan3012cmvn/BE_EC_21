
import { Document } from 'mongoose';
export interface ITransportSubStaff extends Document
{
  email:string,
	fullName: string,
	phone: string,
	password:string,
	isVerify: boolean,
	role: string,
  image:string,
};
