import { Document } from 'mongoose';

export interface IAddress {
	district:string,
  ward: string,
  coordinates:string,
  phoneNumber:string,
}
export interface IUser{
	email: string;
	fullName?: string;
	phone: string;
	password: string;
	isVerify?: boolean;
	typeLogin: string;
	role: string;
	otp: string;
	address?: IAddress;
	image: string;
}
export interface IUserDocument extends Document,IUser {
	
}
