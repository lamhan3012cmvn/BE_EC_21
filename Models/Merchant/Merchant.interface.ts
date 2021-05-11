import { Document } from 'mongoose';
export interface IMerchant extends Document {
	name: string;
	description: string;
	image: string;
	address: string;
	phone: string;
	status: string;
	FK_category: string;
  FK_CreateUser:string;
}
