import { Document } from 'mongoose';
export enum ERole {
	ADMIN = 'ADMIN',
	USER = 'USER',
	MERCHANT = 'MERCHANT',
	TRANSPORT = 'TRANSPORT',
	SUB_MERCHANT = 'SUB_MERCHANT',
	SUB_TRANSPORT = 'SUB_TRANSPORT'
}
export enum ETypeLogin {
	EMAIL = 'EMAIL',
	GOOGLE = 'GOOGLE',
	FACEBOOK = 'FACEBOOK'
}
export interface IUser extends Document {
	email: string;
	fullName?: string;
	phone: string;
	password: string;
	isVerify?: boolean;
	typeLogin: ETypeLogin;
	role: ERole;
	FK_cart?: string;
	otp: string;
	FK_address: string;
	image: string;
	FK_merchant: string;
}
