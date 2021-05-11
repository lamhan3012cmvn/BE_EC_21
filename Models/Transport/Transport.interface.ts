import { Document } from 'mongoose';

export interface ITypeSupport {
	title: string;
	price: IPrice;
	available: string;
}
interface IPaymentMethod {
	title: string;
	token: string;
	status: string;
}
export interface IPayment {
	paymentMethod: Array<IPaymentMethod>;
	defaultGateway: string;
}

export interface IPrice{
	km:string,
	kg:string
}
export interface ITransport {
	name: string;
	description: string;
	avatar: string;
	imageVerify: string;
	typeSupport: Array<ITypeSupport>;
	phone: string;
	status?: string;
	headquarters: string;
	payment?: IPayment;
	FK_createUser: string;
}
export interface ITransportDocument extends Document, ITransport {}
