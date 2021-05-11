import { Document } from 'mongoose';
export interface IUser extends Document {
	email: string;
	fullName?: string;
	phone: string;
	password: string;
	isVerify?: boolean;
	typeLogin: string;
	role: string;
	FK_cart?: string;
	otp: string;
	FK_address: string;
	image: string;
	FK_transport: string;
}
